import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as Api from "@/api";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()
  
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (id: string) => Api.cart.removeItem(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get/cart"]);
    }
  });

  return {
    remove: mutateAsync,
    isLoading
  };
};
