import { apiInstance } from "./api";

import { IOrder, IOrderData } from "@/interfaces/orders.interface";

const ORDERS_SEGMENT = "/orders";

export const createOrder = async (data: Array<IOrderData>) => {
  const response = await apiInstance.post<{ paymentUrl: string }>(
    ORDERS_SEGMENT,
    { items: data }
  );

  return response.data;
};

export const getPendingOrders = async () => {
  const response = await apiInstance.get<Array<IOrder>>(
    `${ORDERS_SEGMENT}/pending`
  );

  return response.data;
};

export const cancelOrder = (orderId: string) => {
  return apiInstance.patch(`${ORDERS_SEGMENT}/${orderId}`);
};

export const getMyOrders = async () => {
  const response = await apiInstance.get<Array<IOrder>>(ORDERS_SEGMENT);

  return response.data;
};

export const deleteOrder = (orderId: string) => {
  return apiInstance.delete(`${ORDERS_SEGMENT}/${orderId}`)
}
