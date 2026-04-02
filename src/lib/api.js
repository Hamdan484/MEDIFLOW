import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Use Live environment URL from Vercel if available, otherwise hit local Python Server
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

// Automatically intercept every API request and attach the JWT token if the user is logged in
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
