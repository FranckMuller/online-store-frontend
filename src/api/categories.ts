import { apiInstance } from "./api";
import type { ICategories } from "@/interfaces/categories.interface";

export const getAll = async () => {
  const response = await apiInstance.get<ICategories>('categories');

  return response.data;
};
