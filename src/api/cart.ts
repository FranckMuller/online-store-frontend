import { apiInstance } from "./api";
import { API_URL_SEGMENTS } from "@/config/api.config";
import type { TCart, TProductData } from "@/types/cart.types";

export const getCart = async () => {
  const response = await apiInstance.get<TCart>(API_URL_SEGMENTS.CART);

  return response.data;
};

export const addProduct = async (data: TProductData) => {
  const response = await apiInstance.post(API_URL_SEGMENTS.CART, data);

  return response.data;
};

export const removeItem = (itemId: string) => {
  return apiInstance.delete(`${API_URL_SEGMENTS.CART}/${itemId}`)
}
