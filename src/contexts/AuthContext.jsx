//인증 상태를 관리하는 컨텍스트 파일, 로그인 및 로그아웃 기능 제공
//AccessToken을 LocalStorage에 저장하고, 인증 상태를 전역적으로

import { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../api/auth";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // const getUser = async () => {
    //   const user = await getUserProfile(token)
    //   isAuthenticated ? setUser(user) : setUser(null);
    // }
    // console.log(token);
    isAuthenticated
      ? getUserProfile(token).then((data) => {
          setUser(data);
          console.log(user);
        })
      : setUser(null);

    console.log(isAuthenticated);
  }, [isAuthenticated]);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
