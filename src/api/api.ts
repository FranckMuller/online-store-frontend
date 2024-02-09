import axios from "axios";
import type { AxiosResponse } from "axios";
import type { IAuthResponse } from "./auth";
import { getAccessToken, setAccessToken, removeAccessToken } from "./helpers";

const prodApiUrl = 'https://7d42-151-249-128-238.ngrok-free.app'

const refreshToken = async () => {
  const response = await apiInstance.get("auth/refresh");
  setAccessToken(response.data.accessToken);
};

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_API_URL : prodApiUrl,
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
let retry = false;
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        await refreshToken();
        return axios(originalRequest);
      } catch (err) {
        removeAccessToken();
      }
    }

    return Promise.reject(error);
  }
);
