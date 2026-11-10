import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { teamMembers } from "../data/teamMembers";

import "../styles/TeamMemberDetailPage.css";

const roleLabels: Record<string, string> = {
  frontend: "프론트엔드",
  backend: "백엔드",
  designer: "디자이너",
};

function TeamMemberDetailPage() {
  const { id } = useParams();

  const member = teamMembers.find((member) => member.id === Number(id));

  useEffect(() => {
    document.title = member
      ? `${member.nickname} | ProjectMate`
      : "팀원을 찾을 수 없습니다 | ProjectMate";
  }, [member]);

  if (!member) {
    return (
      <div className="team-member-not-found">
        <h2>팀원을 찾을 수 없습니다.</h2>
        <p>요청하신 팀원 정보가 존재하지 않습니다.</p>
        <Link to="/team-search">팀원 목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="team-member-detail-page">
      <div className="team-member-detail-header">
        <Link to="/team-search" className="detail-back-link">
          ← 팀원 목록으로 돌아가기
        </Link>

        <h1>팀원 프로필</h1>
        <p>함께 프로젝트를 진행할 팀원의 정보를 확인해 보세요.</p>
      </div>

      <section className="team-member-detail-card">
        <div className="detail-profile-section">
          <div className="detail-avatar">{member.nickname.charAt(0)}</div>

          <div className="detail-profile-info">
            <h2>{member.nickname}</h2>
            <span className="detail-role">{roleLabels[member.role]}</span>
          </div>
        </div>

        <div className="detail-section">
          <h3>자기소개</h3>
          <p>{member.introduction}</p>
        </div>

        <div className="detail-section">
          <h3>기술 스택</h3>
          <div className="detail-tech-stack">
            {member.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>활동 가능 시간</h3>
          <p>{member.availability}</p>
        </div>

        <div className="detail-action">
          <button type="button" disabled>
            프로젝트 참여 요청
          </button>
          <p>프로젝트 참여 요청 기능은 추후 구현할 예정입니다.</p>
        </div>
      </section>
    </div>
  );
}

export default TeamMemberDetailPage;
