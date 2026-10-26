import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    recruitmentStatus: "모집 중" | "모집 완료";
    recruitCount: number;
}

const mockProjects: Project[] = [
    {
        id: 1,
        title: "ProjectMate",
        description: "포트폴리오를 위한 프로젝트 팀원 모집 플랫폼",
        techStack: ["React", "TypeScript", "Express"],
        recruitmentStatus: "모집 중",
        recruitCount: 3,
    },
    {
        id: 2,
        title: "Study Together",
        description: "함께 공부하고 성장하는 스터디 관리 서비스",
        techStack: ["JavaScript", "React", "Node.js"],
        recruitmentStatus: "모집 중",
        recruitCount: 2,
    },
    {
        id: 3,
        title: "Daily Tracker",
        description: "일상과 목표를 기록하는 생산성 관리 웹 서비스",
        techStack: ["TypeScript", "React", "Supabase"],
        recruitmentStatus: "모집 완료",
        recruitCount: 0,
    },
    {
        id: 4,
        title: "Dev Community",
        description: "개발자들의 지식 공유 및 기술 토론 커뮤니티",
        techStack: ["React", "Express", "PostgreSQL"],
        recruitmentStatus: "모집 중",
        recruitCount: 4,
    },
];

function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [seletedTech, setSelectedTech] = useState("전체");
    const [selectedStatus, setSelectedStatus] = useState("전체");

    const navigate = useNavigate();

    const filteredProjects = mockProjects.filter((project) => {
        const keyword = searchTerm.toLowerCase();

        const matchesSearch =
            project.title.toLowerCase().includes(keyword) ||
            project.description.toLowerCase().includes(keyword) ||
            project.techStack.some((tech) =>
                tech.toLowerCase().includes(keyword)
        );

        const matchesTech = 
            seletedTech === "전체" || 
            project.techStack.includes(seletedTech);
        
        const matchesStatus =
            selectedStatus === "전체" ||
            project.recruitmentStatus === selectedStatus;

        return matchesSearch && matchesTech && matchesStatus;
    })

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
                        value={seletedTech}
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

                <button
                    type="button"
                    onClick={() => {
                        setSearchTerm("");
                        setSelectedTech("전체");
                        setSelectedStatus("전체");
                    }}
                >
                    필터 초기화
                </button>
            </section>

            <section className="pm-projects__list">
                <div className="pm-projects__list-header">
                    <h2>전체 프로젝트</h2>
                    <span>{filteredProjects.length}개</span>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="pm-projects__grid">
                        {filteredProjects.map((project) => (
                            <article
                                className="pm-project-card"
                                key={project.id}
                            >
                                <div className="pm-project-card__header">
                                    <span
                                        className={`pm-project-card__status ${
                                            project.recruitmentStatus ===
                                            "모집 중"
                                                ? "is-recruiting"
                                                : "is-closed"
                                        }`}
                                    >
                                        {project.recruitmentStatus}
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
                                    <span>
                                        모집 인원 {project.recruitCount}명
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/projects/${project.id}`)}
                                        disabled={
                                            project.recruitmentStatus ===
                                            "모집 완료"
                                        }
                                    >
                                        {project.recruitmentStatus ===
                                        "모집 중"
                                            ? "프로젝트 보기"
                                            : "모집 종료"}
                                    </button>
                                </div>
                            </article>
                        ))}
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