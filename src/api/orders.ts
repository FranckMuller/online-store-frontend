import { apiInstance } from "./api";

import { IOrder } from "@/interfaces/orders.interface";

const ORDERS_SEGMENT = "/orders";

export const createOrder = async (data: IOrder) => {
  const response = await apiInstance.post<{paymentUrl: string}>(ORDERS_SEGMENT, {items:data});
  
  return response.data
};
