import Cookies from "js-cookie";

export const setAccessToken = (token: string) => {
  Cookies.set("access-token", token, { expires:1 });
};

export const getAccessToken = () => {
  const token = Cookies.get("access-token") || "";
  return token;
};

export const removeAccessToken = () => {
  Cookies.remove("access-token");
};
