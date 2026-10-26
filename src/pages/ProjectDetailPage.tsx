import { Link, useParams } from 'react-router-dom';

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

function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();

    const project = mockProjects.find(
        (item) => item.id === Number(id)
    );

    if(!project) {
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

    return (
        <main className="pm-project-detail">
            <Link
                to="/projects"
                className="pm-project-detail__back"
            >
                ← 프로젝트 목록
            </Link>

            <section className="pm-project-detail__content">
                <div className="pm-project-detail__header">
                    <span
                        className={`pm-project-detail__status ${
                            project.recruitmentStatus === "모집 중"
                                ? "is-recruiting"
                                : "is-closed"
                        }`}
                    >
                        {project.recruitmentStatus}
                    </span>

                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
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
                    <h2>팀원 모집 정보</h2>
                    <p>
                        모집 상태: {project.recruitmentStatus}
                    </p>
                    <p>
                        모집 인원: {project.recruitCount}명
                    </p>
                </section>

                <div className="pm-project-detail__actions">
                    <button
                        type="button"
                        disabled={project.recruitmentStatus === "모집 완료"}
                    >
                        {project.recruitmentStatus === "모집 중"
                            ? "참여 신청"
                            : "모집 종료"}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default ProjectDetailPage;