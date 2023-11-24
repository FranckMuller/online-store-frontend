import axios from "axios";
import { getAccessToken, setAccessToken } from "./helpers";

const refreshToken = async () => {
  const response = await apiInstance.get("auth/refresh");
  setAccessToken(response.data.accessToken);
};

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      await refreshToken();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
