import { apiInstance } from "./api";
import { ISignupData, ISigninData } from "@/interfaces/auth.interface";
import { setAccessToken, removeAccessToken } from "./helpers";

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

export const signin = async (signinData: ISigninData) => {
  const response = await apiInstance.post("auth/signin", signinData);
  setAccessToken(response.data.accessToken);
  return response.data;
};

export const signout = async () => {
  await apiInstance.post("auth/signout");
  removeAccessToken();
};

export const checkAuth = async () => {
  console.log("check auth");
  const response = await apiInstance.get<ISignupResponse>("auth/check");
  return response.data;
};
