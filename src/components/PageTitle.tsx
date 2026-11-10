import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "ProjectMate",
  "/login": "로그인",
  "/signup": "회원가입",
  "/mypage": "마이페이지",
  "/projects": "프로젝트",
  "/projects/create": "프로젝트 등록",
  "/team-search": "팀원 찾기",
};

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // 상세 페이지 제목은 각 상세 페이지에서 직접 설정
    if (
      (pathname.startsWith("/projects/") && pathname !== "/projects/create") ||
      pathname.startsWith("/team-search/")
    ) {
      return;
    }

    const title = pageTitles[pathname];

    document.title =
      title === "ProjectMate"
        ? "ProjectMate"
        : `${title ?? "페이지"} | ProjectMate`;
  }, [location.pathname]);

  return null;
}

export default PageTitle;
