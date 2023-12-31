import { apiInstance } from "./api";

import type {
  IProductReview,
  IProductReviews,
} from "@/interfaces/reviews.interface";

export type ReviewData = {
  rating: number;
  text?: string;
};

export type DeleteReviewResponse = {
  id: string;
};

export const create = async (data: ReviewData, productId: string) => {
  const response = await apiInstance.post<IProductReview>(
    `reviews/${productId}`,
    data
  );
  return response.data;
};

export const getAllByProduct = async (productId: string) => {
  const response = await apiInstance.get<IProductReviews>(
    `reviews/${productId}`
  );
  return response.data;
};

export const deleteOne = async (id: string) => {
  const response = await apiInstance.delete<DeleteReviewResponse>(
    `reviews/${id}`
  );
  return response.data;
};

export const update = async (data: ReviewData, reviewId: string) => {
  const response = await apiInstance.patch<IProductReview>(`reviews/${reviewId}`, data);
  return response.data;
};
