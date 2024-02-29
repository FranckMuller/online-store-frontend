export interface IOrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    mainImage: {
      path: string;
    };
    price: string;
  };
  quantity: number;
  total: number;
}

export enum EOrderStatuses {
  Pending = "pending",
  Payed = "payed",
  Shipped = "shipped",
  Delivered = "delivered",
  Canceled = "canceled"
}

export interface IOrder {
  id: string;
  items: Array<IOrderItem>;
  paymentUrl: string;
  amount: number;
  status: EOrderStatuses;
}

export interface IOrderData {
  quantity: number;
  product: string;
}

export enum EOrdersParamsKeys {
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
