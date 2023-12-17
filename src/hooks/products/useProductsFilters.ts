import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  useQueryState,
  useQueryStates,
  UseQueryStatesKeysMap,
} from "next-usequerystate";

import type { IProductsFilters } from "@/interfaces/products.interface";

export enum EProductsFilterKeys {
  Sort = "sort",
  MaxPrice = "maxPrice",
  MinPrice = "minPrice",
  Category = "category",
}

export const useProductsFilters = () => {
  const searchParams = useSearchParams();
  const [filtersParams, setFiltersParams] = useState<IProductsFilters>({});
  const [params, setParams] = useQueryStates<any>({
    sort: EProductsFilterKeys.Sort,
    category: EProductsFilterKeys.Category,
    minPrice: EProductsFilterKeys.MinPrice,
    maxPrice: EProductsFilterKeys.MaxPrice,
  });

  useEffect(() => {
    searchParams.forEach((value, key) => {
      setFiltersParams((prev) => ({
        ...prev,
        [key]: value,
      }));
    });
  }, [searchParams]);

  const updateFilters = (key: keyof IProductsFilters, value: string) => {
    if (value) {
      setParams({
        [key]: value,
      });
    } else {
      setParams({
        [key]: null,
      });
    }

    setFiltersParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { updateFilters, filtersParams };
};
