import type { ICategory } from "./categories.interface";
import type { IProductReviews } from "./reviews.interface";

export interface IProductImage {
  id: string;
  path: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  images: IProductImage[];
  mainImage: IProductImage;
  published: boolean;
  category?: ICategory;
  reviews?: IProductReviews;
  totalReviews?: number;
  rating?: number;
}

export interface IProductPreviewImage {
  id: string;
  path: string;
  isMain?: boolean;
}

export enum EProductsSort {
  HighPrice = "high-price",
  MinPrice = "min-price",
  Newest = "newest",
  Oldest = "oldest"
}

export type TRatingFilterValue = 1 | 2 | 3 | 4 | 5;

export interface IProductsFilters {
  sort?: EProductsSort | string;
  searchTerm?: string;
  rating?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
}

export interface IProducts extends Array<IProduct> {}

export interface ICartProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  count?: string;
}

export interface ICartProducts extends Array<ICartProduct> {}
