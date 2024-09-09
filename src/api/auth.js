import axios from "axios";
// import { useContext } from "react";
// import { AuthContext, login } from "../contexts/AuthContext";

export const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// export const getUserProfile = async (token) => {
//     const response = await axios.
// }

// export const updateProfile = async (formData) => {};
