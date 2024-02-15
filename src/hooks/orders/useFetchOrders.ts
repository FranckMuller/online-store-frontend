import { useQuery } from "@tanstack/react-query";
import type { IFetchOrdersParams } from "@/interfaces/orders.interface";

import * as Api from "@/api";

export const useFetchOrders = (queryParams = {} as IFetchOrdersParams) => {
  const { data, isLoading } = useQuery(["get/orders", queryParams], {
    queryFn: () => Api.orders.getOrders(queryParams)
  });

  return {
    orders: data,
    isLoading
  };
};
