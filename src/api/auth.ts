import { apiInstance } from "./api";
import { ISignupData, ISigninData } from "@/interfaces/auth.interface";
import { setAccessToken } from "./helpers";

export interface ISignupResponse {
  user: {
    id: string;
    username: string;
    email: string;
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

export const signin = async (signinData: ISigninData) => {};

export const signout = async () => {
  return await apiInstance.post("auth/signout");
};

export const checkAuth = () => {};
