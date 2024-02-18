import type { IUser } from "./users.interface";

export interface IProductReview {
  id: string;
  rating: number;
  text?: string;
  user: IUser;
}

export type TReviewData = { rating: number; text?: string };

export interface IProductReviews extends Array<IProductReview> {}
