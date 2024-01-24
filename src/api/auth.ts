import { apiInstance } from "./api";
import { setAccessToken, removeAccessToken } from "./helpers";

import type { ISignupData, ISigninData } from "@/interfaces/auth.interface";

export interface IAuthResponse {
    user: {
      id: string;
      username: string;
      email: string;
      avatarMini: string;
    };
    accessToken: string;
}

export const signup = async (signupData: ISignupData) => {
  const response = await apiInstance.post<IAuthResponse>(
    "auth/signup",
    signupData
  );

  setAccessToken(response.data.accessToken);

  return response.data;
};

export const signin = async (signinData: ISigninData) => {
  const response = await apiInstance.post("auth/signin", signinData);
  setAccessToken(response.data.accessToken);
  return response.data;
};

export const signout = async (userId: string) => {
  const response = await apiInstance.post(`auth/signout/${userId}`);
  removeAccessToken();
  return response.data;
};

export const checkAuth = async () => {
  const response = await apiInstance.get<IAuthResponse>("auth/check");
  return response.data;
};
