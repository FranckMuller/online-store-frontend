export type TCartItemProduct = {
  id: string;
  name: string;
  mainImage: {
    id: string;
    path: string;
  };
  price: number;
  averageRating: number;
  description: string
};

export type TCartItem = {
  id: string;
  product: TCartItemProduct;
  quantity: number;
  total: number;
};

export interface ICartItems extends Array<TCartItem> {}

export type TCart = {
  items: ICartItems;
  subTotal: number;
};

export type TProductData = {
  productId: string;
  quantity: number;
};
