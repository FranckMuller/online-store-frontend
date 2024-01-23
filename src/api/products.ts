import axios from "axios";
import { apiInstance } from "./api";

import type {
  IProducts,
  IProduct,
  IProductsFilters
} from "@/interfaces/products.interface";

interface CreateProductResponse {
  name: string;
  description: string;
  price: string;
  images: string[];
}

const PRODUCTS_SEGMENT = "products";

export const getAll = async (searchParams = {} as IProductsFilters) => {
  const response = await apiInstance.get<IProducts>(PRODUCTS_SEGMENT, {
    params: searchParams
  });

  return response.data;
};

export const getById = async (id: string) => {
  const response = await apiInstance.get<IProduct>(`${PRODUCTS_SEGMENT}/${id}`);

  return response.data;
};

export const getMyById = async (id: string) => {
  const response = await apiInstance.get<IProduct>(
    `${PRODUCTS_SEGMENT}/my/${id}`
  );

  return response.data;
};

export const create = async (data: FormData) => {
  const response = await apiInstance.post<CreateProductResponse>(
    PRODUCTS_SEGMENT,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );

  return response.data;
};

export const update = async (data: FormData, productId: string) => {
  const response = await apiInstance.patch<CreateProductResponse>(
    `${PRODUCTS_SEGMENT}/${productId}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );

  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await apiInstance.delete(`${PRODUCTS_SEGMENT}/${productId}`);
  return response;
};

export const getMyProducts = async () => {
  const response = await apiInstance.get<IProducts>("/products/my");
  return response.data;
};

export const toggleFavorites = (productId: string) => {
  return apiInstance.patch(`${PRODUCTS_SEGMENT}/favorites/${productId}`);
};

export const getFavoritesProducts = async () => {
  const response = await apiInstance.get<IProducts>(
    `${PRODUCTS_SEGMENT}/favorites`
  );

  return response.data;
};
