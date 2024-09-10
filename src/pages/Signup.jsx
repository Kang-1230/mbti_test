import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { useLocation } from "react-router-dom";

export function Signup() {
  const [mode, setMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/login" ? setMode(true) : setMode(false);
  }, [location.pathname]);

  return (
    <>
      <AuthForm mode={mode} />
    </>
  );
}
