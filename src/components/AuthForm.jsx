import { useContext, useState } from "react";
import { API_URL } from "../api/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// 회원가입인지 로그인인지 구분하기 위해 mode 를 props 로 받습니다.
// onSubmit 도 회원가입과 로그인 페이지에서 각각 구현을 하고 props 로 넘겨줄 겁니다.
const AuthForm = ({ mode }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const navigate = useNavigate();
  const { login, setIsAuthenticated } = useContext(AuthContext);

  // 바꾼 id, password를 제출 버튼을 눌렀을 때 axios를 사용해 로그인 요청을 서버에 보낸다.
  const handleSubmit = async (e) => {
    if (mode === true) {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_URL}/login`, {
          id: formData.id,
          password: formData.password,
        });
        //서버로부터 응답이 오면 response.data에서 데이터를 추출한다.
        const data = response.data;
        if (data.success) {
          //서버에서 받은 응답에서 success 필드를 확인하여 로그인 성공 여부를 판단한다.
          login(data.accessToken);
          setIsAuthenticated(true);
          alert("Login success!");
          navigate("/");
        } else {
          alert("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed");
      }
    } else {
      e.preventDefault();
      try {
        const response = await axios.post(
          "https://moneyfulpublicpolicy.co.kr/register",
          {
            id: formData.id,
            password: formData.password,
            nickname: formData.nickname,
          }
        );
        const data = response.data;
        if (data.success) {
          navigate("/login");
        } else {
          alert("Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Signup failed");
      }
    }
  };

  return (
    <>
      <h1>{mode === true ? "로그인" : "회원가입"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="아이디"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="비밀번호"
          required
        />
        {mode === false && (
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={(e) =>
              setFormData({ ...formData, nickname: e.target.value })
            }
            placeholder="닉네임"
            required
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
        )}
        <button type="submit">{mode === true ? "로그인" : "회원가입"}</button>
      </form>
      {mode === true && (
        <>
          <p>회원가입이 필요하세요?</p>
          <Link to={"/signup"}>회원가입</Link>
        </>
      )}
    </>
  );
};

export default AuthForm;
