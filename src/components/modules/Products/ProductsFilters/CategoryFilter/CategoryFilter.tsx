import { useState } from "react";
import { EProductsFilterKeys } from "@/hooks/products/useProductsFilters";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";
import type { IProductsFilters } from "@/interfaces/products.interface";

import styles from "./CategoryFilter.module.scss";

type Props = {
  updateFilters: (key: keyof IProductsFilters, value: string) => void;
  categories: ICategories;
  value?: string;
};

const CategoryFilter = ({ updateFilters, categories, value }: Props) => {
  return (
    <div className={styles["category-filter"]}>
      <h4 className={styles["title"]}>Categories</h4>
      <ul className={styles["list"]}>
        <li className={styles["item"]}>
          <input
            id="all"
            type="checkbox"
            onChange={(e) => updateFilters(EProductsFilterKeys.Category, "all")}
            checked={value === "all"}
          />
          <label htmlFor='all' className={styles["label"]}>
            All
          </label>
        </li>
        {categories.map((c) => (
          <li className={styles["item"]} key={c.id}>
            <input
              id={c.id}
              type="checkbox"
              onChange={(e) =>
                updateFilters(EProductsFilterKeys.Category, c.name)
              }
              checked={value === c.name}
            />
            <label htmlFor={c.id} className={styles["label"]}>
              {c.title.en}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
