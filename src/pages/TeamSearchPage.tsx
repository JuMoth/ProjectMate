import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TeamSearchPage.css";
import { teamMembers } from "../data/teamMembers";

const roleLabels: Record<string, string> = {
  frontend: "프론트엔드",
  backend: "백엔드",
  designer: "디자이너",
};

function TeamSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredMembers = teamMembers.filter((member) => {
    const keyword = searchKeyword.toLowerCase().trim();

    const matchesNickname = member.nickname.toLowerCase().includes(keyword);

    const matchesTechStack = member.techStack.some((tech) =>
      tech.toLowerCase().includes(keyword),
    );

    const matchesKeyword = matchesNickname || matchesTechStack;

    const matchesRole = selectedRole === "all" || member.role === selectedRole;

    return matchesKeyword && matchesRole;
  });

  return (
    <div className="team-search-page">
      <section className="team-search-header">
        <h1>팀원 찾기</h1>
        <p>나와 함께 프로젝트를 진행할 팀원을 찾아보세요.</p>
      </section>

      <section className="team-search-content">
        <div className="team-search-toolbar">
          <input
            type="text"
            placeholder="닉네임 또는 기술 스택으로 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
          >
            <option value="all">전체 분야</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="designer">디자이너</option>
          </select>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="team-member-list">
            {filteredMembers.map((member) => (
              <article className="team-member-card" key={member.id}>
                <div className="team-member-info">
                  <div className="team-member-avatar">
                    {member.nickname.charAt(0)}
                  </div>

                  <div className="team-member-profile">
                    <h3>{member.nickname}</h3>
                    <span>{roleLabels[member.role]}</span>
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
                  <Link
                    to={`/team-search/${member.id}`}
                    className="team-member-detail-button"
                  >
                    프로필 보기
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="team-search-empty">
            <h3>검색 결과가 없습니다.</h3>
            <p>다른 닉네임이나 기술 스택으로 검색해 보세요.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default TeamSearchPage;
