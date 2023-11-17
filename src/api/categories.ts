import { apiInstance } from "./api";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";

export type CreateCategoryData = {
  name: string;
  title: {
    en: string;
    ru: string;
  };
  icon: string;
};

export const getAll = async () => {
  const response = await apiInstance.get<ICategories>("categories");

  return response.data;
};

export const create = async (data: CreateCategoryData) => {
  const response = await apiInstance.post<ICategory>("categories", data);

  return response.data;
};

export const deleteOne = async (id: string) => {
  const response = await apiInstance.delete(`categories/${id}`)
  
  return response.data
}

