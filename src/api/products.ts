import axios from "axios";
import { apiInstance } from "./api";

import type {
  IProducts,
  IProduct,
  IProductsFilters,
} from "@/interfaces/products.interface";

interface CreateProductResponse {
  name: string;
  description: string;
  price: string;
  images: string[];
}

export const getAll = async (searchParams = {} as IProductsFilters) => {
  const response = await apiInstance.get<IProducts>("products", {
    params: searchParams,
  });

  return response.data;
};

export const getById = async (id: string) => {
  const response = await apiInstance.get<IProduct>(`products/${id}`);

  return response.data;
};

export const create = async (data: FormData) => {
  const response = await apiInstance.post<CreateProductResponse>(
    "products",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

export const update = async (data: FormData, productId: string) => {
  const response = await apiInstance.patch<CreateProductResponse>(
    `products/${productId}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await apiInstance.delete(`products/${productId}`);
  return response;
};

export const getMyProducts = async () => {
  const response = await apiInstance.get<IProducts>("/products/my");
  return response.data;
};
