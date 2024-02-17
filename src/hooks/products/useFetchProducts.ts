import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";

import type {
  IFetchProductsParams,
  IProducts
} from "@/interfaces/products.interface";

export const useFetchProducts = (queryParams = {} as IFetchProductsParams) => {
  const { data, isLoading, isFetching } = useQuery(
    ["get/products", queryParams],
    {
      queryFn: () => Api.products.getAll(queryParams),
    }
  );

  return { products: data, isLoading, isFetching };
};
