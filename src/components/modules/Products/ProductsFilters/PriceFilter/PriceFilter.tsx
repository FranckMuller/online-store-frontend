import { useState, useEffect, useRef } from "react";

import { EProductsParamsKeys } from "@/interfaces/products.interface";

import styles from "./PriceFilter.module.scss";

type Props = {
  min?: number;
  max?: number;
  initialFromValue?: string;
  initialToValue?: string;
  updateFilters: (key: EProductsParamsKeys, value: string) => void;
};

const PriceFilter = ({
  min = 0,
  max = 2000,
  initialFromValue,
  initialToValue,
  updateFilters
}: Props) => {
  const shouldUpdateTilters = useRef(false);
  const [fromValue, setFromValue] = useState(initialFromValue || "");
  const [toValue, setToValue] = useState(initialToValue || "");

  const onFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromValue(e.target.value);
  };

  const onToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToValue(e.target.value);
  };

  // TODO isolate into hook
  useEffect(() => {
    if (shouldUpdateTilters.current) {
      let timeoutId: ReturnType<typeof setTimeout>;

      timeoutId = setTimeout(() => {
        updateFilters(EProductsParamsKeys.MinPrice, fromValue);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [fromValue]);

  useEffect(() => {
    if (shouldUpdateTilters.current) {
      let timeoutId: ReturnType<typeof setTimeout>;

      timeoutId = setTimeout(() => {
        updateFilters(EProductsParamsKeys.MaxPrice, toValue);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [toValue]);

  useEffect(() => {
    shouldUpdateTilters.current = true;
  }, []);

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
