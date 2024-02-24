import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";

export const useFetchCart = () => {
  const { data, isLoading } = useQuery(["get/cart"], {
    queryFn: Api.cart.getCart
  });

  return {
    cart: data,
    isLoading
  };
};
