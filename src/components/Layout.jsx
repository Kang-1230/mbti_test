import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  //로그인 하지 않은 사용자를 alert 메세지와 함께 로그인 페이지로 보내기
  useEffect(() => {
    isAuthenticated ? (
      <></>
    ) : (
      alert("로그인이 필요합니다") || navigate("/login")
    );
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="프로필">
                  <button onClick={handleLogout}>로그아웃</button>
                </Link>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">{children}</main>
    </div>
  );
};

export default Layout;
