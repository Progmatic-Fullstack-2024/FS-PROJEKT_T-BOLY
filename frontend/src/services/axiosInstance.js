import axios from "axios";
import { API_URL } from "../constants/constants";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else if (config.data !== null && typeof config.data === "object") {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;
