import { Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>ProjectMate</h2>

                <nav>
                    <a href="/">홈</a>
                    <a href="/projects">프로젝트</a>
                    <a href="/projects/create">팀원 찾기</a>
                    <a href="/mypage">마이페이지</a>
                </nav>
            </aside>

            <div className="main-content">
                <header className="header">
                    <span>ProjectMate</span>
                    <div>
                        <a href="/login">로그인</a>
                        <a href="/signup">회원가입</a>
                    </div>
                </header>
                
                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;