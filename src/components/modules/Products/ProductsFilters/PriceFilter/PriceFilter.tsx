import { useState, useEffect } from "react";

import {
  useProductsFilters,
  EProductsFilterKeys,
} from "@/hooks/products/useProductsFilters";

import type { IProductsFilters } from "@/interfaces/products.interface";

import styles from "./PriceFilter.module.scss";

enum EPriceFiltersKeys {
  minPrice = "min-price",
  maxPrice = "max-price",
}

type Props = {
  min?: number;
  max?: number;
  initialFromValue?: string;
  initialToValue?: string;
  updateFilters: (key: keyof IProductsFilters, value: string) => void;
};

const PriceFilter = ({
  min = 0,
  max = 2000,
  initialFromValue,
  initialToValue,
  updateFilters,
}: Props) => {
  const [fromValue, setFromValue] = useState(initialFromValue || "");
  const [toValue, setToValue] = useState(initialToValue || "");

  const onFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
    // updateFilters("minPrice", e.target.value);
  };

  const onToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
    // updateFilters("maxPrice", e.target.value);
  };

  // TODO isolate into hook
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (fromValue) {
      timeoutId = setTimeout(() => {
        updateFilters(EProductsFilterKeys.MinPrice, fromValue);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fromValue]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (toValue) {
      timeoutId = setTimeout(() => {
        updateFilters(EProductsFilterKeys.MaxPrice, toValue);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toValue]);

  return (
    <div className={styles["price-filter"]}>
      <p className={styles["title"]}>Price from/to</p>
      <div className={styles["inputs-wrapper"]}>
        <input
          onChange={onFromValueChange}
          placeholder="from"
          min={min}
          max={max}
          type="number"
          value={fromValue}
        />
        <span>-</span>
        <input
          onChange={onToValueChange}
          placeholder="to"
          min={min}
          max={max}
          type="number"
          value={toValue}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
