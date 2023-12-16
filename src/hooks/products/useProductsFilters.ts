import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQueryState } from "next-usequerystate";

import type { IProductsFilters } from "@/interfaces/products.interface";

export enum EProductsFilterKeys {
  Sort = "sort",
  MaxPrice = "maxPrice",
  MinPrice = "minPrice",
  Category = "category",
}

export const useProductsFilters = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const [filtersParams, setFiltersParams] = useState<IProductsFilters | {}>({});
  const [sortParam, setSortParam] = useQueryState("sort");
  const [minPriceParam, setMinPriceParam] = useQueryState("minPrice");
  const [maxPriceParam, setMaxPriceParam] = useQueryState("maxPrice");
  const [categoryParam, setCategoryParam] = useQueryState("category");

  useEffect(() => {
    searchParams.forEach((value, key) => {
      setFiltersParams((prev) => ({
        ...prev,
        [key]: value,
      }));
    });
  }, [searchParams]);

  const updateFilters = (
    key: keyof IProductsFilters,
    value: string,
    category?: string
  ) => {
    // const params = new URLSearchParams(searchParams.toString());
    console.log(key, value);
    if (value) {
      // params.set(key, value);
      switch (key) {
        case EProductsFilterKeys.Sort:
          setSortParam(value);
          break;

        case EProductsFilterKeys.MaxPrice:
          setMaxPriceParam(value);
          break;

        case EProductsFilterKeys.MinPrice:
          setMinPriceParam(value);
          break;

        case EProductsFilterKeys.Category:
          if(category){
          setCategoryParam(category)}
          break;
      }

      setFiltersParams((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else {
      // params.delete(key);
    }

    setIsUpdated(true);
  };

  return { updateFilters, isUpdated, filtersParams };
};
