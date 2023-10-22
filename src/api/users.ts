import { apiInstance } from "./api";

import type { IFullestUser } from "@/interfaces/users.interface";

export const getById = async (id: string) => {
  const response = await apiInstance.get<IFullestUser>(`/users/${id}`);

  return response.data;
};
