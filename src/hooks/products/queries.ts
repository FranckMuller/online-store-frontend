import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";

import type {IProducts} from '@/interfaces/products.interface'

export const useGetProducts = (initialProducts: IProducts, filtersParams = {}) => {
  const { data, isLoading, error } = useQuery(["get/products", filtersParams], {
    queryFn: () => Api.products.getAll(filtersParams),
    initialData: initialProducts ?? []
  });

  return {
    products: data,
    isLoadingGetProducts: isLoading,
    getProductsError: error
  };
};
