import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryStates } from "next-usequerystate";

export const useQueryParams = <K>(paramsInitObj: K) => {
  const searchParams = useSearchParams();
  const [params, setParams] = useQueryStates<any>(paramsInitObj);

// TODO need refactoring
  const updateQueryParams = (key: keyof K, value: string) => {
    console.log(params[key], value);
    if (params[key] === value) {
      if (key !== "maxPrice" || key !== "minPrice") {
        setParams({ [key]: null });
      }
    } else {
      if (value) {
        setParams({ [key]: value });
      } else {
        setParams({ [key]: null });
      }
    }
  };

  useEffect(() => {
    searchParams.forEach((value, key) => {
      setParams(prev => ({
        ...prev,
        [key]: value
      }));
    });
  }, [searchParams]);

  return { queryParams: params, updateQueryParams };
};
