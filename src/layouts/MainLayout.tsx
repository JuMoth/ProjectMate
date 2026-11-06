import { NavLink, Outlet } from 'react-router-dom';
import {
    House,
    FolderKanban,
    Users,
    UserRound,
} from "lucide-react";

import "./MainLayout.css";

function MainLayout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>ProjectMate</h2>

                <nav>
                    <NavLink to="/" end>
                        <House size={18} />
                        <span>홈</span>
                    </NavLink>

                    <NavLink to="/projects" end>
                        <FolderKanban size={18} />
                        <span>프로젝트</span>
                    </NavLink>

                    <NavLink to="/projects/create">
                        <Users size={18} />
                        <span>팀원 찾기</span>
                    </NavLink>

                    <NavLink to="/mypage">
                        <UserRound size={18} />
                        <span>마이페이지</span>
                    </NavLink>
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