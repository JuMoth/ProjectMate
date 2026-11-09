import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectCreatePage from "./pages/ProjectCreatePage";
import TeamSearchPage from "./pages/TeamSearchPage";
import TeamMemberDetailPage from "./pages/TeamMemberDetailPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 후 사용하는 공통 레이아웃 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team-search" element={<TeamSearchPage />} />
          <Route path="/team-search/:id" element={<TeamMemberDetailPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/projects/create" element={<ProjectCreatePage />} />
        </Route>

        {/* 로그인 전용 페이지 */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
