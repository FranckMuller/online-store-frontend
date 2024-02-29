import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";

export const useConfirmShipment = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (orderId: string) => Api.orders.confirmShipment(orderId),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get/orders"]);
    }
  });

  return {
    confirm: mutateAsync,
    isLoading
  };
};
