import axios from "axios";
import { getAccessToken, setAccessToken } from "./helpers";
import { store } from "@/store/store";

const refreshToken = async () => {
  let userId = store.getState().auth.user?.id;
  if (userId) {
    const response = await apiInstance.get(`auth/refresh/${userId}`);
    console.log(response.data.accessToken);
    setAccessToken(response.data.accessToken);
  }
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
    console.log(token)
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest._isRetry);
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      await refreshToken();
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
