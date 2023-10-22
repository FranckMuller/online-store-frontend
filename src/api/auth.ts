import { apiInstance } from "./api";
import { ISignupData, ISigninData } from "@/interfaces/auth.interface";
import { setAccessToken, removeAccessToken } from "./helpers";

export interface ISignupResponse {
  user: {
    id: string;
    username: string;
    email: string;
    avatarMini: string;
  };
  accessToken: string;
}

export const signup = async (signupData: ISignupData) => {
  const response = await apiInstance.post<ISignupResponse>(
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
  const response = await apiInstance.get<ISignupResponse>("auth/check");
  return response.data;
};
