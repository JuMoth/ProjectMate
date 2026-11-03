
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectCreatePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [recruitCount, setRecruitCount] = useState("3");
  const [deadline, setDeadline] = useState("");

  const techOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Supabase",
  ];

  const handleTechChange = (tech: string) => {
    setTechStack((prev) =>
      prev.includes(tech)
        ? prev.filter((item) => item !== tech)
        : [...prev, tech]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (techStack.length === 0) {
      alert("기술 스택을 하나 이상 선택해 주세요.");
      return;
    }

    alert("현재는 화면 구현 단계입니다. 프로젝트 저장은 아직 지원하지 않습니다.");
  };

  return (
    <main className="pm-project-create">
      <div className="pm-project-create__header">
        <h1>프로젝트 만들기</h1>
        <p>함께 성장할 팀원을 모집해 보세요.</p>
      </div>

      <form
        className="pm-project-create__form"
        onSubmit={handleSubmit}
      >
        <section className="pm-project-create__section">
          <h2>기본 정보</h2>

          <div className="pm-project-create__field">
            <label htmlFor="project-title">프로젝트 제목</label>
            <input
              id="project-title"
              type="text"
              placeholder="프로젝트 제목을 입력해 주세요."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              maxLength={50}
            />
          </div>

          <div className="pm-project-create__field">
            <label htmlFor="project-description">프로젝트 소개</label>
            <textarea
              id="project-description"
              placeholder="프로젝트의 목적과 주요 기능을 소개해 주세요."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={6}
              maxLength={1000}
            />
            <span className="pm-project-create__hint">
              {description.length}/1000자
            </span>
          </div>
        </section>

        <section className="pm-project-create__section">
          <h2>기술 스택</h2>
          <p className="pm-project-create__hint">
            프로젝트에서 사용할 기술을 선택해 주세요.
          </p>

          <div className="pm-project-create__tech-list">
            {techOptions.map((tech) => (
              <label
                key={tech}
                className={`pm-project-create__tech ${
                  techStack.includes(tech) ? "is-selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={techStack.includes(tech)}
                  onChange={() => handleTechChange(tech)}
                />
                {tech}
              </label>
            ))}
          </div>
        </section>

        <section className="pm-project-create__section">
          <h2>모집 정보</h2>

          <div className="pm-project-create__field">
            <label htmlFor="recruit-count">모집 인원</label>
            <select
              id="recruit-count"
              value={recruitCount}
              onChange={(event) => setRecruitCount(event.target.value)}
            >
              <option value="1">1명</option>
              <option value="2">2명</option>
              <option value="3">3명</option>
              <option value="4">4명</option>
              <option value="5">5명</option>
              <option value="6">6명 이상</option>
            </select>
          </div>

          <div className="pm-project-create__field">
            <label htmlFor="project-deadline">모집 마감일</label>
            <input
              id="project-deadline"
              type="date"
              value={deadline}
              min={new Date().toLocaleDateString("sv-SE")}
              onChange={(event) => setDeadline(event.target.value)}
              required
            />
          </div>
        </section>

        <div className="pm-project-create__actions">
          <button
            type="button"
            className="pm-project-create__cancel"
            onClick={() => navigate("/projects")}
          >
            취소
          </button>
          <button type="submit" className="pm-project-create__submit">
            프로젝트 생성
          </button>
        </div>
      </form>
    </main>
  );
}

export default ProjectCreatePage;