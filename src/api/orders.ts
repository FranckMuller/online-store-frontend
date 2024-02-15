import { apiInstance } from "./api";
import {
  IOrder,
  IOrderData,
  type IFetchOrdersParams
} from "@/interfaces/orders.interface";

const ORDERS_SEGMENT = "/orders";

export const getOrders = async (searchParams = {} as IFetchOrdersParams) => {
  const response = await apiInstance.get<Array<IOrder>>(ORDERS_SEGMENT, {
    params: searchParams
  });

  return response.data;
};

export const createOrder = async (data: Array<IOrderData>) => {
  const response = await apiInstance.post<{ paymentUrl: string }>(
    ORDERS_SEGMENT,
    { items: data }
  );

  return response.data;
};

export const cancelOrder = (orderId: string) => {
  return apiInstance.patch(`${ORDERS_SEGMENT}/${orderId}`);
};

export const removeOrder = (orderId: string) => {
  return apiInstance.delete(`${ORDERS_SEGMENT}/${orderId}`);
};
