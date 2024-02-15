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

export enum EOrdersParamsKeyes {
  STATUS = "status"
}

export enum EOrderSortStatuses {
  ALL = "",
  PENDING = "pending",
  PAYED = "payed",
  SHIPPED = "shippped",
  DELIVERED = "delivered",
  CANCELED = "canceled"
}

export interface IFetchOrdersParams {
  status?: EOrderSortStatuses;
}
