import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { getProjectById } from "../services/project.service";
import {
  applyToProject,
  getMyApplication,
} from "../services/application.service";

import type { Project } from "../types/project.types";

import "../styles/ProjectDetailPage.css";

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationError, setApplicationError] = useState("");

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      const projectId = Number(id);

      if (!Number.isInteger(projectId) || projectId <= 0) {
        setProject(null);
        setIsNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setIsNotFound(false);
        setProject(null);
        setIsApplied(false);
        setApplicationError("");

        const data = await getProjectById(projectId);

        if (!isMounted) return;

        setProject(data);

        const application = await getMyApplication(projectId);

        if (isMounted) {
          setIsApplied(application !== null);
        }
      } catch (err) {
        if (isMounted) {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            setIsNotFound(true);
          } else {
            setError("프로젝트 정보를 불러오지 못했습니다.");
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [id, retryCount]);

  useEffect(() => {
    document.title = project
      ? `${project.title} | ProjectMate`
      : isNotFound
        ? "프로젝트를 찾을 수 없습니다 | ProjectMate"
        : "프로젝트 상세 | ProjectMate";
  }, [project, isNotFound]);

  const handleApply = async () => {
    const projectId = Number(id);

    if (!project || isRecruitmentClosed) {
      return;
    }

    try {
      setIsApplying(true);
      setApplicationError("");

      await applyToProject(projectId);

      setIsApplied(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setApplicationError(
          err.response?.data?.message || "참여 신청 중 오류가 발생했습니다.",
        );
      } else {
        setApplicationError("참여 신청 중 오류가 발생했습니다.");
      }
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <main className="pm-project-detail">
        <section className="pm-project-detail__not-found">
          <p>프로젝트 정보를 불러오는 중입니다...</p>
        </section>
      </main>
    );
  }

  if (isNotFound) {
    return (
      <main className="pm-project-detail">
        <section className="pm-project-detail__not-found">
          <h1>프로젝트를 찾을 수 없습니다.</h1>
          <p>삭제되었거나 존재하지 않는 프로젝트입니다.</p>
          <Link to="/projects">프로젝트 목록으로 돌아가기</Link>
        </section>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="pm-project-detail">
        <section className="pm-project-detail__not-found">
          <h1>프로젝트 정보를 불러오지 못했습니다.</h1>
          <p>{error}</p>

          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            다시 시도
          </button>

          <Link to="/projects">프로젝트 목록으로 돌아가기</Link>
        </section>
      </main>
    );
  }

  const [year, month, day] = project.deadline.split(".").map(Number);
  const deadlineDate = new Date(year, month - 1, day);

  deadlineDate.setHours(23, 59, 59, 999);

  const isDeadlinePassed = deadlineDate < new Date();

  const isRecruitmentClosed =
    project.recruitmentStatus === "CLOSED" || isDeadlinePassed;

  return (
    <main className="pm-project-detail">
      <Link to="/projects" className="pm-project-detail__back">
        ← 프로젝트 목록
      </Link>

      <section className="pm-project-detail__content">
        <div className="pm-project-detail__header">
          <span
            className={`pm-project-detail__status ${
              isRecruitmentClosed ? "is-closed" : "is-recruiting"
            }`}
          >
            {isRecruitmentClosed ? "모집 완료" : "모집 중"}
          </span>

          <h1>{project.title}</h1>
          <p>{project.category}</p>

          <div className="pm-project-detail__meta">
            <span>작성자: {project.author}</span>
            <span>등록일: {project.createdAt}</span>
          </div>
        </div>

        <section className="pm-project-detail__section">
          <h2>프로젝트 소개</h2>
          <p>{project.description}</p>
        </section>

        <section className="pm-project-detail__section">
          <h2>기술 스택</h2>

          <div className="pm-project-detail__stack">
            {project.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section className="pm-project-detail__section">
          <h2>모집 정보</h2>

          <div className="pm-project-detail__recruit-info">
            <div>
              <span>모집 상태</span>
              <strong>{isRecruitmentClosed ? "모집 완료" : "모집 중"}</strong>
            </div>

            <div>
              <span>모집 인원</span>
              <strong>{project.recruitCount}명</strong>
            </div>

            <div>
              <span>모집 마감일</span>
              <strong>{project.deadline}</strong>
            </div>
          </div>

          <div className="pm-project-detail__recruitment">
            <h3>모집 분야</h3>

            {project.recruitmentFields.length > 0 ? (
              <ul>
                {project.recruitmentFields.map((field) => (
                  <li key={field.role}>
                    <span>{field.role}</span>
                    <strong>{field.count}명</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>현재 모집 중인 분야가 없습니다.</p>
            )}
          </div>
        </section>

        <div className="pm-project-detail__actions">
          <button
            type="button"
            disabled={isRecruitmentClosed || isApplied || isApplying}
            onClick={handleApply}
          >
            {isRecruitmentClosed
              ? "모집 종료"
              : isApplied
                ? "신청 완료"
                : isApplying
                  ? "신청 중..."
                  : "참여 신청"}
          </button>

          {applicationError && <p role="alert">{applicationError}</p>}
        </div>
      </section>
    </main>
  );
}

export default ProjectDetailPage;