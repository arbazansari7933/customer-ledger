// src/utils/api.js
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Automatically attach token on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // token expired / invalid
      localStorage.removeItem("token");

      // Force redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
