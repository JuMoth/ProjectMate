import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "../styles/ProjectDetailPage.css";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  recruitmentStatus: "모집 중" | "모집 완료";
  recruitCount: number;
  category: string;
  author: string;
  createdAt: string;
  deadline: string;
  deletedAt: string | null;
  recruitmentFields: {
    role: string;
    count: number;
  }[];
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "ProjectMate",
    description: "포트폴리오를 위한 프로젝트 팀원 모집 플랫폼",
    techStack: ["React", "TypeScript", "Express"],
    recruitmentStatus: "모집 중",
    recruitCount: 3,
    category: "웹 개발",
    author: "개발자",
    createdAt: "2026.11.01",
    deadline: "2026.11.30",
    deletedAt: null,
    recruitmentFields: [
      { role: "프론트엔드", count: 1 },
      { role: "백엔드", count: 1 },
      { role: "디자이너", count: 1 },
    ],
  },
  {
    id: 2,
    title: "Study Together",
    description: "함께 공부하고 성장하는 스터디 관리 서비스",
    techStack: ["JavaScript", "React", "Node.js"],
    recruitmentStatus: "모집 중",
    recruitCount: 2,
    category: "스터디",
    author: "스터디장",
    createdAt: "2026.11.03",
    deadline: "2026.11.25",
    deletedAt: null,
    recruitmentFields: [
      { role: "프론트엔드", count: 1 },
      { role: "백엔드", count: 1 },
    ],
  },
  {
    id: 3,
    title: "Daily Tracker",
    description: "일상과 목표를 기록하는 생산성 관리 웹 서비스",
    techStack: ["TypeScript", "React", "Supabase"],
    recruitmentStatus: "모집 완료",
    recruitCount: 0,
    category: "웹 개발",
    author: "기획자",
    createdAt: "2026.10.20",
    deadline: "2026.11.05",
    deletedAt: null,
    recruitmentFields: [],
  },
  {
    id: 4,
    title: "Dev Community",
    description: "개발자들의 지식 공유 및 기술 토론 커뮤니티",
    techStack: ["React", "Express", "PostgreSQL"],
    recruitmentStatus: "모집 중",
    recruitCount: 4,
    category: "웹 개발",
    author: "커뮤니티 운영자",
    createdAt: "2026.11.05",
    deadline: "2026.12.01",
    deletedAt: null,
    recruitmentFields: [
      { role: "프론트엔드", count: 2 },
      { role: "백엔드", count: 2 },
    ],
  },
];

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [isApplied, setIsApplied] = useState(false);

  const project = mockProjects.find(
    (item) => item.id === Number(id) && item.deletedAt === null,
  );

  if (!project) {
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

  const deadlineDate = new Date(project.deadline.replace(/\./g, "-"));

  deadlineDate.setHours(23, 59, 59, 999);

  const isDeadlinePassed = deadlineDate < new Date();

  const isRecruitmentClosed =
    project.recruitmentStatus === "모집 완료" || isDeadlinePassed;

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
              <strong>
                {isRecruitmentClosed ? "모집 완료" : "모집 중"}
              </strong>
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
            disabled={isRecruitmentClosed || isApplied}
            onClick={() => {
              setIsApplied(true);
              alert("프로젝트 참여 신청이 완료되었습니다.");
            }}
          >
            {isRecruitmentClosed
              ? "모집 종료"
              : isApplied
                ? "신청 완료"
                : "참여 신청"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetailPage;
