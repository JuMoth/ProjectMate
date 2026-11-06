import { Link, Outlet } from "react-router-dom";

import "./AuthLayout.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="auth-header">
        <Link to="/" className="auth-logo">
          ProjectMage
        </Link>

        <Link to="/" className="auth-home-button">
          홈으로 돌아가기
        </Link>
      </header>

      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
