import axios from "axios";
import { LoginUserData, UserData } from "./types";

const API_URL = "/api/users/";

// Register User
const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login User
const login = async (userData: LoginUserData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { register, login, logout };
export default authService;
