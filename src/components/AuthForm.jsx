import React, { useState } from "react";
import { API_URL, login } from "../api/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";

// 회원가입인지 로그인인지 구분하기 위해 mode 를 props 로 받습니다.
// onSubmit 도 회원가입과 로그인 페이지에서 각각 구현을 하고 props 로 넘겨줄 겁니다.
const AuthForm = ({ mode, onSubmit }) => {
  // 무엇을 formData 에 넣어야 할까요?
  // *********빠진 부분 : formData의 활용, mode, onSubmit***********//
  // const [formData, setFormData] = useState({
  //   id,
  //   password,
  // });
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //name이 id면 setId를 바꾸고, 아니면 setPassword를 바꾼다.
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "id" ? setId(value) : setPassword(value);
  };

  // 바꾼 id, password를 제출 버튼을 눌렀을 때 axios를 사용해 로그인 요청을 서버에 보낸다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        id,
        password,
      });
      //서버로부터 응답이 오면 response.data에서 데이터를 추출한다.
      const data = response.data;
      if (data.success) {
        //서버에서 받은 응답에서 success 필드를 확인하여 로그인 성공 여부를 판단한다.
        login(data.accessToken);
        // <Navigate/>
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        // value={formData.id}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="아이디"
        required
      />
      <input />
      <input
        type="password"
        name="password"
        // value={formData.password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        required
      />
      <input />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
      )}
      <button type="submit">{mode === "login" ? "로그인" : "회원가입"}</button>
    </form>
  );
};

export default AuthForm;
