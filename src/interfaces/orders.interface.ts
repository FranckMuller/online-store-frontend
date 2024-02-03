export interface IOrderItem  {
  product: string,
  quantity: number
};

export interface IOrder extends Array<IOrderItem> {};
