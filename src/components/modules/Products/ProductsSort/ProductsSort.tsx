import { forwardRef} from "react";
import { withClickOutside } from "@/utils/withClickOutside";
import { EProductsFilterKeys } from "@/hooks/products/useProductsFilters";

import { FaCaretDown } from "react-icons/fa";

import type { DropdownProps } from "@/utils/withClickOutside";
import {
  EProductsSort,
  IProductsFilters,
} from "@/interfaces/products.interface";

import styles from "./ProductsSort.module.scss";

type Props = {
  updateFilters: (key: keyof IProductsFilters, value: string) => void;
  value?: string;
};

type Option = {
  label: string;
  value: string;
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
  ({ opened, toggleDropdown, updateFilters, value }, ref) => {
    
    let activeLabel = "Default";
    const activeItem = sortOptions.find((o) => o.value === value);
    if (activeItem) {
      activeLabel = activeItem.label;
    }

    const handleClick = (option: Option) => {  
      updateFilters(EProductsFilterKeys.Sort, option.value);
      toggleDropdown(!opened)
    };

    return (
      <div ref={ref} className={styles["products-sort"]}>
        <button
          onClick={() => toggleDropdown(!opened)}
          className={styles["button"]}
        >
          <span className={styles["title"]}>Sort by:</span>
          <span className={styles["label"]}>{activeLabel}</span>
          <span className={styles["icon"]}>
            <FaCaretDown />
          </span>
        </button>
        {opened && (
          <div>
            <ul className={styles["select"]}>
              {sortOptions.map((o) => (
                <li
                  onClick={() => handleClick(o)}
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
