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

export interface IProducts extends Array<IProduct> {}
