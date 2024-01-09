import { apiInstance } from "./api";

import type { IFullestUser } from "@/interfaces/users.interface";

export const getById = async (id: string) => {
  const response = await apiInstance.get<IFullestUser>(`/users/${id}`);

  return response.data;
};

export const updateAvatar = async (data: FormData) => {
  const response = await apiInstance.post<string>("users/update-avatar", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
