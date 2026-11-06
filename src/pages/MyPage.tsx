import { useState } from "react";

import "../styles/MyPage.css";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  recruitmentStatus: "모집 중" | "모집 완료";
}

const myProjects: Project[] = [
  {
    id: 1,
    title: "ProjectMate",
    description: "포트폴리오를 위한 프로젝트 팀원 모집 플랫폼",
    techStack: ["React", "TypeScript", "Express"],
    recruitmentStatus: "모집 중",
  },
  {
    id: 2,
    title: "Daily Tracker",
    description: "일상과 목표를 기록하는 생산성 관리 웹 서비스",
    techStack: ["TypeScript", "React", "Supabase"],
    recruitmentStatus: "모집 완료",
  },
];

const joinedProjects: Project[] = [
  {
    id: 3,
    title: "Study Together",
    description: "함께 공부하고 성장하는 스터디 관리 서비스",
    techStack: ["JavaScript", "React", "Node.js"],
    recruitmentStatus: "모집 중",
  },
];

function MyPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("개발자");
  const [introduction, setIntroduction] = useState(
    "함께 프로젝트를 진행하며 성장하고 싶은 개발자입니다.",
  );

  const handleSave = () => {
    setIsEditing(false);
    alert("프로필이 수정되었습니다.");
  };

  return (
    <main className="pm-mypage">
      <div className="pm-mypage__header">
        <h1>마이페이지</h1>
        <p>내 프로필과 프로젝트 활동을 확인할 수 있습니다.</p>
      </div>

      {/* 프로필 영역 */}
      <section className="pm-mypage__profile">
        <div className="pm-mypage__profile-header">
          <div className="pm-mypage__avatar">{nickname.charAt(0)}</div>
          <div className="pm-mypage__profile-info">
            <h2>{nickname}</h2>
            <p>projectmate@example.com</p>
          </div>

          <button
            type="button"
            className="pm-mypage__edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "취소" : "프로필 수정"}
          </button>
        </div>

        {isEditing ? (
          <div className="pm-mypage__edit-form">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event?.target.value)}
            />

            <label htmlFor="introduction">자기소개</label>
            <textarea
              id="introduction"
              value={introduction}
              onChange={(event) => setIntroduction(event.target.value)}
              rows={3}
            />

            <button
              type="button"
              className="pm-mypage__save-button"
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>
        ) : (
          <div className="pm-mypage__introduction">
            <h3>자기소개</h3>
            <p>{introduction}</p>
          </div>
        )}

        <div className="pm-mypage__tech-stack">
          <h3>기술 스택</h3>
          <div className="pm-mypage__tags">
            {["JavaScript", "TypeScript", "React", "Node.js", "Express"].map(
              (tech) => (
                <span key={tech}>{tech}</span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* 내가 만든 프로젝트 */}
      <section className="pm-mypage__projects">
        <div className="pm-mypage__section-header">
          <h2>내가 만든 프로젝트</h2>
          <span>{myProjects.length}개</span>
        </div>

        <div className="pm-mypage__project-list">
          {myProjects.map((project) => (
            <article key={project.id} className="pm-mypage__project-card">
              <div className="pm-mypage__project-header">
                <h3>{project.title}</h3>
                <span
                  className={`pm-mypage__statue ${
                    project.recruitmentStatus === "모집 중"
                      ? "is-recruiting"
                      : "is-closed"
                  }`}
                >
                  {project.recruitmentStatus}
                </span>
              </div>

              <p>{project.description}</p>

              <div className="pm-mypage__tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 참여 중인 프로젝트 */}
      <section className="pm-mypage__projects">
        <div className="pm-mypage__section-header">
          <h2>참여 중인 프로젝트</h2>
          <span>{joinedProjects.length}개</span>
        </div>

        <div className="pm-mypage__project-list">
          {joinedProjects.map((project) => (
            <article key={project.id} className="pm-mypage__project-card">
              <div className="pm-mypage__project header">
                <h3>{project.title}</h3>
                <span
                  className={`pm-mypage__status ${
                    project.recruitmentStatus === "모집 중"
                      ? "is-recruiting"
                      : "is-closed"
                  }`}
                >
                  {project.recruitmentStatus}
                </span>
              </div>

              <p>{project.description}</p>

              <div className="pm-mypage__tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MyPage;
