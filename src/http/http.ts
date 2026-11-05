import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_COOKIE } from "@/constants/storage-keys";

export const http = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://apiwhaidata.pauloturcko.dev",
});

http.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_COOKIE);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config.url !== "/users/login" &&
      window.location.pathname !== "/login"
    ) {
      Cookies.remove(AUTH_COOKIE);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
