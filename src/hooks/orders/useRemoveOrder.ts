import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";

export const useRemoveOrder = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: Api.orders.removeOrder,
    async onSuccess() {
      await queryClient.invalidateQueries(["get/orders"]);
    }
  });

  return { remove: mutateAsync, isLoading };
};
