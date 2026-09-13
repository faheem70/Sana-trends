import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the appropriate session token automatically.
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("sana_admin_token") ||
    localStorage.getItem("sana_user_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
