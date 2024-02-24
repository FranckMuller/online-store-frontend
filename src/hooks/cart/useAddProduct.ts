import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";
import type { TProductData } from "@/types/cart.types";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError } = useMutation({
    mutationFn: (data: TProductData) => Api.cart.addProduct(data),
    onSettled: async () => {
      await queryClient.invalidateQueries(["get/cart"]);
    }
  });

  return {
    add: mutateAsync,
    isLoading,
    isError
  };
};
