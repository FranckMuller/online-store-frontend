import type { ICategories } from "./categories.interface";

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
  categories: ICategories;
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
  Oldest = "oldest",
}

export enum EproductsFilters {
  Sort ='sort'
}

export interface IProductsFilters {
  sort?: EProductsSort | string
  searchTerm?: string
  rating?: string
  minPrice?: string
  maxPrice?: string
  category?: string
}

export interface IProducts extends Array<IProduct> {}
