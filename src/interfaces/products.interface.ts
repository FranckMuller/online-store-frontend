export interface IProductImage {
  id: string;
  filename: string;
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
}

export interface IProductPreviewImage {
  path: string;
  isMain: boolean;
}

export interface IProducts extends Array<IProduct> {}
