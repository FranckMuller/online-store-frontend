import Cookies from "js-cookie";

export const setAccessToken = (token: string) => {
  console.log("set token", token);
  Cookies.set("access-token", token);
};

export const getAccessToken = () => {
  const token = Cookies.get("access-token") || '';
  console.log("get token", token);
  return token;
};
