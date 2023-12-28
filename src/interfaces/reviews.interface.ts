import type { IUser } from "./users.interface";

export interface IProductReview {
  id: string;
  rating: number;
  text?: string;
  user: IUser;
}

export interface IProductReviews extends Array<IProductReview> {}
