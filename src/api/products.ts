import axios from "axios";
import type { IProducts, IProduct } from "@/interfaces/products.interface";

interface CreateProductResponse {
  name: string;
  description: string;
  price: string;
  images: string[];
}

export const getAll = async () => {
  const response = await axios.get<IProducts>(
    "http://localhost:3500/api/products"
  );

  return response.data;
};

export const getById = async (id: string) => {
  const response = await axios.get<IProduct>(
    `http://localhost:3500/api/products/${id}`
  );

  return response.data;
};

export const create = async (data: FormData) => {
  const response = await axios.post<CreateProductResponse>(
    "http://localhost:3500/api/products",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await axios.delete(
    `http://localhost:3500/api/products/${productId}`
  );
  return response;
};
