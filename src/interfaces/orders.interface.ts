export interface IOrderItem {
  id: string;
  product: {
    _id: string;
    name: string;
    mainImage: {
      path: string;
    };
    price: string;
  };
  quantity: number;
  amount: number;
}

export interface IOrder {
  id: string;
  items: Array<IOrderItem>;
  paymentUrl: string;
  amount: number;
  status: string;
}

export interface IOrderData {
  quantity: number;
  product: string;
}
