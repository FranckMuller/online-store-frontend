import { useState, useEffect, forwardRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { withClickOutside } from "@/utils/withClickOutside";
import type { DropdownProps } from "@/utils/withClickOutside";

import { FaCaretDown } from "react-icons/fa";

import {
  EProductsSort,
  EproductsFilters,
  IProductsFilters,
} from "@/interfaces/products.interface";

import styles from "./ProductsSort.module.scss";

type Props = {
  shouldHide: boolean;
  onChange: (key: keyof IProductsFilters, value: string) => void;
};

const sortOptions = [
  {
    label: "High price",
    value: EProductsSort.HighPrice,
  },
  {
    label: "Min price",
    value: EProductsSort.MinPrice,
  },
  {
    label: "Newest",
    value: EProductsSort.Newest,
  },
  {
    label: "Oldest",
    value: EProductsSort.Oldest,
  },
];

const ProductsSort = forwardRef<HTMLDivElement, DropdownProps & Props>(
  ({ opened, toggleDropdown, onChange, shouldHide }, ref) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    let activeSortOption = null;
    const sortValue = searchParams.get("sort");

    if (sortValue) {
      activeSortOption = sortOptions.find((o) => o.value === sortValue);
    }

    useEffect(() => {
      if (shouldHide) {
        // setIsOpened(false);
      }
    }, [shouldHide]);

    return (
      <div ref={ref} className={styles["products-sort"]}>
        <button
          onClick={() => toggleDropdown(!opened)}
          className={styles["button"]}
        >
          <span className={styles["title"]}>Sort by:</span>
          <span className={styles["label"]}>
            {activeSortOption ? activeSortOption.label : "default"}
          </span>
          <span className={styles["icon"]}>
            <FaCaretDown />
          </span>
        </button>
        {opened && (
          <div>
            <ul className={styles["select"]}>
              {sortOptions.map((o) => (
                <li
                  onClick={() => onChange(EproductsFilters.Sort, o.value)}
                  className={`${styles["option"]}`}
                  key={o.label}
                >
                  {o.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

ProductsSort.displayName = "ProductsSort";

export default withClickOutside(ProductsSort);
