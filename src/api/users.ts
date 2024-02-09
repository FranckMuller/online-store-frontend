import { apiInstance } from "./api";

import type { IFullestUser, IUsers } from "@/interfaces/users.interface";
import type { IProducts } from "@/interfaces/products.interface";

export const getAll = async () => {
  const response = await apiInstance.get<IUsers>("users");

  return response.data;
};

export const getById = async (id: string) => {
  const response = await apiInstance.get<IFullestUser>(`/users/${id}`);

  return response.data;
};

export const updateAvatar = async (data: FormData) => {
  const response = await apiInstance.post<string>("users/update-avatar", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};
