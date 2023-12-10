import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { IProductsFilters } from "@/interfaces/products.interface";

enum EFilters {
  Sort = "sort",
}

export const useFilters = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const [isUpdated, setIsUpdated] = useState(false);

  const [filtersParams, setFiltersParams] = useState<IProductsFilters | {}>({});

  useEffect(() => {
    searchParams.forEach((value, key) => {
      setFiltersParams((prev) => ({
        ...prev,
        [key]: value,
      }));
    });
  }, []);

  const onChangeFilters = (key: keyof IProductsFilters, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
      setFiltersParams((prev) => ({
        ...prev,
        [key]: value,
      }));
    } else {
      params.delete(key);
    }

    // router.replace(`${currentPath}?${params.toString()}`);

    window.history.pushState(
      {},
      "",
      window.location.pathname + "?" + params.toString()
    );
    setIsUpdated(true);
  };

  return { onChangeFilters, isUpdated, filtersParams };
};
