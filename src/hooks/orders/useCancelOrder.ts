import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: Api.orders.cancelOrder,
    async onSuccess() {
      await queryClient.invalidateQueries(["get/pendingOrders"]);
    }
  });

  return { cancel: mutateAsync, isLoading };
};
