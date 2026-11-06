import { NavLink, Outlet } from "react-router-dom";
import {
  House,
  FolderKanban,
  Users,
  UserRound,
  Search,
  Bell,
} from "lucide-react";

import "./MainLayout.css";

function MainLayout() {
  const isLoggedIn = false;

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
          <div className="header-search">
            <Search size={18} />
            <input type="text" placeholder="프로젝트, 기술 스택 검색" />
          </div>

          {isLoggedIn ? (
            <div className="header-actions" aria-label="알림">
              <button className="header-notification">
                <Bell size={20} />
              </button>

              <div className="header-profile">
                <div className="header-profile-avatar">
                  <UserRound size={18} />
                </div>

                <span>사용자</span>
              </div>
            </div>
          ) : (
            <div className="header-actions">
              <a href="/login">로그인</a>
              <a href="/signup">회원가입</a>
            </div>
          )}
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
