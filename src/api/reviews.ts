import { apiInstance } from "./api";

import type {
  IProductReview,
  IProductReviews,
} from "@/interfaces/reviews.interface";

import type { QueryFunctionContext } from "@tanstack/react-query";

const LIMIT = 2;

export interface ReviewData {
  rating: number;
  text?: string;
}

export interface IUpdateReviewData extends ReviewData {
  reviewId: string;
}

type ReviewDataResponse = {
  results: IProductReviews;
  offset: number | null;
};

export type DeleteReviewResponse = {
  id: string;
};

type IPaginateReviewsResponse = {
  reviews: IProductReviews;
  offset: number | undefined;
};

export const create = async (data: ReviewData, productId: string) => {
  const response = await apiInstance.post<IProductReview>(
    `reviews/${productId}`,
    data
  );
  return response.data;
};

export const getAllByProduct = async ({
  offset,
  productId,
}: {
  offset: number;
  productId: string;
}) => {
  const response = await apiInstance.get<IPaginateReviewsResponse>(
    `reviews/${productId}?offset=${offset}&limit=${LIMIT}`
  );

  return {
    results: response.data.reviews,
    offset: response.data.offset,
  };
};

export const deleteOne = async (id: string) => {
  const response = await apiInstance.delete<DeleteReviewResponse>(
    `reviews/${id}`
  );
  return response.data;
};

export const update = async (data: IUpdateReviewData) => {
  const { reviewId, ...reviewData } = data;
  const response = await apiInstance.patch<IProductReview>(
    `reviews/${reviewId}`,
    reviewData
  );
  return response.data;
};
