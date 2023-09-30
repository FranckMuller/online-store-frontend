import { apiInstance } from "./api";
import { ISignupData } from "@/interfaces/auth.interface";

export interface ISignupResponse {
  accessToken: string;
}

export const signup = async (signupData: ISignupData) => {
  const response = await apiInstance.post<ISignupResponse>(
    "http://localhost:3500/api/auth/signup",
    signupData
  );
};
