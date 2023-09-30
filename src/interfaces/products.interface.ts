export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

export interface IProducts extends Array<IProduct> {}
