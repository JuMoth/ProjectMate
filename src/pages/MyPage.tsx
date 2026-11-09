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

  const [techStack, setTechStack] = useState([
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
  ]);

  const [editTechStack, setEditTechStack] = useState(techStack);
  const [newTech, setNewTech] = useState("");

  const [editNickname, setEditNickname] = useState(nickname);
  const [editIntroduction, setEditIntroduction] = useState(introduction);

  const techOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Supabase",
    "Python",
    "Java",
    "Spring",
    "AWS",
    "Docker",
  ];

  const handleAddTech = () => {
    if (!newTech) {
      alert("추가할 기술 스택을 선택해 주세요.");
      return;
    }

    if (editTechStack.includes(newTech)) {
      alert("이미 추가된 기술 스택입니다.");
      return;
    }

    setEditTechStack((prev) => [...prev, newTech]);
    setNewTech("");
  };

  const handleRemoveTech = (tech: string) => {
    setEditTechStack((prev) => prev.filter((item) => item !== tech));
  };

  const handleEdit = () => {
    setEditNickname(nickname);
    setEditIntroduction(introduction);
    setEditTechStack(techStack);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditNickname(nickname);
    setEditIntroduction(introduction);
    setEditTechStack(techStack);
    setNewTech("");
    setIsEditing(false);
  };

  const handleSave = () => {
    const trimmedNickname = editNickname.trim();
    const trimmedIntroduction = editIntroduction.trim();

    if (!trimmedNickname) {
      alert("닉네임을 입력해 주세요.");
      return;
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
      alert("닉네임은 2자 이상 20자 이하로 입력해 주세요.");
      return;
    }

    if (!trimmedIntroduction) {
      alert("자기소개를 입력해 주세요.");
      return;
    }

    if (trimmedIntroduction.length > 300) {
      alert("자기소개는 300자 이하로 입력해 주세요.");
      return;
    }

    if (editTechStack.length === 0) {
      alert("기술 스택을 하나 이상 선택해 주세요.");
      return;
    }

    setNickname(trimmedNickname);
    setIntroduction(trimmedIntroduction);
    setTechStack(editTechStack);
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
            onClick={isEditing ? handleCancel : handleEdit}
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
              value={editNickname}
              onChange={(event) => setEditNickname(event.target.value)}
              minLength={2}
              maxLength={20}
            />

            <label htmlFor="introduction">자기소개</label>
            <textarea
              id="introduction"
              value={editIntroduction}
              onChange={(event) => setEditIntroduction(event.target.value)}
              rows={3}
              maxLength={300}
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
            {(isEditing ? editTechStack : techStack).map((tech) => (
              <span key={tech}>
                {tech}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    aria-label={`${tech} 삭제`}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div className="pm-mypage__tech-add">
              <select
                value={newTech}
                onChange={(event) => setNewTech(event.target.value)}
              >
                <option value="">기술 스택 선택</option>

                {techOptions
                  .filter((tech) => !editTechStack.includes(tech))
                  .map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
              </select>

              <button type="button" onClick={handleAddTech}>
                추가
              </button>
            </div>
          )}
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
