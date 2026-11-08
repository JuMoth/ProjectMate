import "../styles/TeamSearchPage.css";

interface TeamMember {
  id: number;
  nickname: string;
  role: string;
  introduction: string;
  techStack: string[];
  availability: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    nickname: "개발하는곰",
    role: "프론트엔드",
    introduction:
      "React와 TypeScript를 활용해 사용자 친화적인 웹 서비스를 만들고 싶습니다.",
    techStack: ["React", "TypeScript", "JavaScript"],
    availability: "평일 저녁",
  },
  {
    id: 2,
    nickname: "코딩하는토끼",
    role: "백엔드",
    introduction:
      "Node.js 기반의 백엔드 개발과 데이터베이스 설계에 관심이 많습니다.",
    techStack: ["Node.js", "Express", "PostgreSQL"],
    availability: "주말",
  },
  {
    id: 3,
    nickname: "디자인새싹",
    role: "디자이너",
    introduction:
      "사용자 경험을 고려한 UI/UX 디자인과 프로토타이핑을 좋아합니다.",
    techStack: ["Figma", "UI/UX", "Photoshop"],
    availability: "평일 및 주말",
  },
  {
    id: 4,
    nickname: "풀스택도전",
    role: "프론트엔드",
    introduction: "새로운 기술을 배우며 실제 서비스 개발 경험을 쌓고 싶습니다.",
    techStack: ["React", "JavaScript", "CSS"],
    availability: "평일 저녁",
  },
];

function TeamSearchPage() {
  return (
    <div className="team-search-page">
      <section className="team-search-header">
        <h1>팀원 찾기</h1>
        <p>나와 함께 프로젝트를 진행할 팀원을 찾아보세요.</p>
      </section>

      <section className="team-search-content">
        <div className="team-search-toolbar">
          <input type="text" placeholder="닉네임 또는 기술 스택으로 검색" />

          <select defaultValue="all">
            <option value="all">전체 분야</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="designer">디자이너</option>
          </select>
        </div>

        {teamMembers.length > 0 ? (
          <div className="team-member-list">
            {teamMembers.map((member) => (
              <article className="team-member-card" key={member.id}>
                <div className="team-member-info">
                  <div className="team-member-avatar">
                    {member.nickname.charAt(0)}
                  </div>

                  <div className="team-member-profile">
                    <h3>{member.nickname}</h3>
                    <span>{member.role}</span>
                  </div>
                </div>

                <p className="team-member-introduction">
                  {member.introduction}
                </p>

                <div className="team-member-tech-stack">
                  {member.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="team-member-footer">
                  <span>활동 가능 시간: {member.availability}</span>
                  <button type="button">프로필 보기</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="team-search-empty">
            <h3>아직 등록된 팀원이 없습니다.</h3>
            <p>새로운 팀원이 등록되면 이곳에서 확인할 수 있습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default TeamSearchPage;
