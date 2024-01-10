import { isAxiosError } from "axios";

export const handleAxiosError = (err: unknown): string => {
  let error = "";

  if (isAxiosError(err) && err.response?.data?.message) {
    error = err.response.data.message;
  }

  return error;
};
