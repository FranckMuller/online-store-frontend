export interface ISignupData {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface ISigninData {
  email: string;
  password: string;
}

export interface ISignupResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  accessToken: string;
}
