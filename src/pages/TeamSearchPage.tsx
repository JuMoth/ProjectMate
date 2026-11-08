import "../styles/TeamSearchPage.css";

function TeamSearchPage() {
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
          />

          <select defaultValue="all">
            <option value="all">전체 분야</option>
            <option value="frontend">프론트엔드</option>
            <option value="backend">백엔드</option>
            <option value="designer">디자이너</option>
          </select>
        </div>

        <div className="team-search-empty">
            <h3>아직 등록된 팀원이 없습니다.</h3>
            <p>새로운 팀원이 등록되면 이곳에서 확인할 수 있습니다.</p>
        </div>
      </section>
    </div>
  );
}

export default TeamSearchPage;
