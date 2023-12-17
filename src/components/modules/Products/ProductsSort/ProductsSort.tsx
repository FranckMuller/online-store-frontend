import { useState, useEffect, forwardRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { withClickOutside } from "@/utils/withClickOutside";
import type { DropdownProps } from "@/utils/withClickOutside";
import { EProductsFilterKeys } from "@/hooks/products/useProductsFilters";

import { FaCaretDown } from "react-icons/fa";

import {
  EProductsSort,
  IProductsFilters,
} from "@/interfaces/products.interface";

import styles from "./ProductsSort.module.scss";

type Props = {
  onChange: (key: keyof IProductsFilters, value: string) => void;
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
  ({ opened, toggleDropdown, onChange }, ref) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [active, setActive] = useState("default");

    useEffect(() => {
      const sortParam = searchParams.get(EProductsFilterKeys.Sort);
      if (sortParam) {
        const activeItem = sortOptions.find((o) => o.value === sortParam);
        if (activeItem) {
          setActive(activeItem.label);
        }
      }
    }, [searchParams]);

    const handleClick = (option: Option) => {
      onChange(EProductsFilterKeys.Sort, option.value);
      setActive(option.label);
    };
    const sortValue = searchParams.get("sort");

    return (
      <div ref={ref} className={styles["products-sort"]}>
        <button
          onClick={() => toggleDropdown(!opened)}
          className={styles["button"]}
        >
          <span className={styles["title"]}>Sort by:</span>
          <span className={styles["label"]}>{active}</span>
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
