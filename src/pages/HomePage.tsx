import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProjects } from "../services/project.service";
import type { Project } from "../types/project.types";

import "../styles/HomePage.css";

function getDeadlineText(deadline: string) {
  const [year, month, day] = deadline.split(".").map(Number);
  const deadlineDate = new Date(year, month - 1, day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  const diff = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return diff >= 0 ? `D-${diff}` : "마감";
}

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProjects();

        if (isMounted) {
          setProjects(data.slice(0, 3));
        }
      } catch {
        if (isMounted) {
          setError("프로젝트 목록을 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <h1>안녕하세요, JuMoth님! 👋</h1>
        <p>오늘도 좋은 프로젝트가 기다리고 있어요.</p>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <p>내 프로젝트</p>
          <strong>3</strong>
        </article>

        <article className="stat-card">
          <p>지원한 프로젝트</p>
          <strong>5</strong>
        </article>

        <article className="stat-card">
          <p>진행 중인 프로젝트</p>
          <strong>2</strong>
        </article>
      </section>

      <section className="recommended-section">
        <div className="section-heading">
          <h2>추천 프로젝트</h2>
          <Link to="/projects">더보기 →</Link>
        </div>

        {isLoading ? (
          <p>프로젝트를 불러오는 중입니다...</p>
        ) : error ? (
          <p>{error}</p>
        ) : projects.length > 0 ? (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-thumbnail">
                  <span>{project.title}</span>
                </div>

                <div className="project-card-body">
                  <h3>{project.title}</h3>

                  <p className="project-description">{project.description}</p>

                  <div className="tech-stack">
                    {project.techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-status">
                    <span>
                      {project.recruitmentStatus === "OPEN"
                        ? "팀원 모집 중"
                        : "모집 완료"}
                    </span>
                    <span>{getDeadlineText(project.deadline)}</span>
                  </div>

                  <div className="project-card-footer">
                    <span>팀원 모집</span>
                    <span>{project.recruitCount}명</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>등록된 프로젝트가 없습니다.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;