import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProjects } from "../services/project.service";
import type { Project } from "../types/project.types";

import "../styles/ProjectsPage.css";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("전체");
  const [selectedStatus, setSelectedStatus] = useState("전체");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProjects();

        if (isMounted) {
          setProjects(data);
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
  }, [retryCount]);

  const filteredProjects = projects.filter((project) => {
    const keyword = searchTerm.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(keyword) ||
      project.description.toLowerCase().includes(keyword) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(keyword));

    const matchesTech =
      selectedTech === "전체" || project.techStack.includes(selectedTech);

    const recruitmentStatus =
      project.recruitmentStatus === "OPEN" ? "모집 중" : "모집 완료";

    const matchesStatus =
      selectedStatus === "전체" || recruitmentStatus === selectedStatus;

    return matchesSearch && matchesTech && matchesStatus;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTech("전체");
    setSelectedStatus("전체");
  };

  return (
    <main className="pm-projects">
      <header className="pm-projects__header">
        <div>
          <h1>프로젝트 탐색</h1>
          <p>함께 성장할 프로젝트와 팀원을 찾아보세요.</p>
        </div>
      </header>

      <section className="pm-projects__search">
        <input
          type="text"
          placeholder="프로젝트명 또는 기술 스택 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="프로젝트 검색"
        />
      </section>

      <section className="pm-projects__filters">
        <label>
          기술 스택
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Express">Express</option>
            <option value="Node.js">Node.js</option>
            <option value="Supabase">Supabase</option>
            <option value="PostgreSQL">PostgreSQL</option>
          </select>
        </label>

        <label>
          모집 상태
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="전체">전체</option>
            <option value="모집 중">모집 중</option>
            <option value="모집 완료">모집 완료</option>
          </select>
        </label>

        <button type="button" onClick={resetFilters}>
          필터 초기화
        </button>
      </section>

      <section className="pm-projects__list">
        <div className="pm-projects__list-header">
          <h2>전체 프로젝트</h2>
          <span>{isLoading ? "-" : `${filteredProjects.length}개`}</span>
        </div>

        {isLoading ? (
          <div className="pm-projects__empty">
            <p>프로젝트를 불러오는 중입니다...</p>
          </div>
        ) : error ? (
          <div className="pm-projects__empty">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              다시 시도
            </button>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="pm-projects__grid">
            {filteredProjects.map((project) => {
              const isRecruiting = project.recruitmentStatus === "OPEN";

              return (
                <article className="pm-project-card" key={project.id}>
                  <div className="pm-project-card__header">
                    <span
                      className={`pm-project-card__status ${
                        isRecruiting ? "is-recruiting" : "is-closed"
                      }`}
                    >
                      {isRecruiting ? "모집 중" : "모집 완료"}
                    </span>
                  </div>

                  <h3>{project.title}</h3>

                  <p className="pm-project-card__description">
                    {project.description}
                  </p>

                  <div className="pm-project-card__stack">
                    {project.techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="pm-project-card__footer">
                    <span>모집 인원 {project.recruitCount}명</span>

                    <button
                      type="button"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      프로젝트 보기
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="pm-projects__empty">
            <p>검색 결과가 없습니다.</p>
            <span>다른 프로젝트명이나 기술 스택을 검색해 보세요.</span>
          </div>
        )}
      </section>
    </main>
  );
}

export default ProjectsPage;