import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";

export const useQueryOrders = () => {
  const { data: orders, isLoading: isLoadingOrders } = useQuery(
    ["get/orders"],
    {
      queryFn: () => Api.orders.getMyOrders()
    }
  );

  return { orders, isLoadingOrders };
};

export const useQueryPendingOrders = () => {
  const {
    data: orders,
    isLoading,
    error
  } = useQuery(["get/pendingOrders"], {
    queryFn: () => Api.orders.getPendingOrders()
  });

  return {
    orders
  };
};

export const useMutationCancelOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: cancelOrder, isLoading: isLoadingCancelOrder } = useMutation({
    mutationFn: (orderId: string) => Api.orders.cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["get/pendingOrders"]);
    }
  });

  return { cancelOrder, isLoadingCancelOrder };
};


export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteOrder, isLoading: isLoadingDelete } = useMutation({
    mutationFn: Api.orders.deleteOrder,
    async onSuccess() {
      await queryClient.invalidateQueries(["get/orders"]);
    }
  });

  return { deleteOrder, isLoadingDelete };
};
