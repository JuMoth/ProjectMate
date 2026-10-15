const projects = [
  {
    id: 1,
    title: '웹 기반 포트폴리오 플랫폼 개발',
    description: '함께 포트폴리오 서비스를 만들어갈 팀원을 모집합니다.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    members: '3/5',
    deadline: 'D-7',
    status: '팀원 모집 중',
  },
  {
    id: 2,
    title: '모바일 웹 UI/UX 리뉴얼 프로젝트',
    description: '사용자 경험을 개선할 프론트엔드 팀원을 찾습니다.',
    stack: ['Figma', 'React', 'Firebase'],
    members: '2/4',
    deadline: 'D-5',
    status: '팀원 모집 중',
  },
  {
    id: 3,
    title: 'AI 기반 이미지 생성 서비스',
    description: 'AI 서비스를 함께 개발할 팀원을 모집합니다.',
    stack: ['Python', 'FastAPI', 'React'],
    members: '1/5',
    deadline: 'D-10',
    status: '팀원 모집 중',
  },
];

function HomePage() {
  return (
    <div className="dashboard">
      <section className="welcome-section">
        <h1>안녕하세요, **님! 👋</h1>
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
          <a href="/projects">더보기 →</a>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-thumbnail">
                <span>ProjectMate</span>
              </div>

              <div className="project-card-body">
                <h3>{project.title}</h3>
                <p className="project-description">
                  {project.description}
                </p>

                <div className="tech-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-status">
                  <span>{project.status}</span>
                  <span>{project.deadline}</span>
                </div>

                <div className="project-card-footer">
                  <span>팀원 모집</span>
                  <span>{project.members}명</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;