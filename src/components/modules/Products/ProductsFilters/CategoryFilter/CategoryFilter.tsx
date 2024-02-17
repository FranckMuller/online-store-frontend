import { useState } from "react";
import type { ICategories } from "@/interfaces/categories.interface";
import { EProductsParamsKeys } from "@/interfaces/products.interface";

import styles from "./CategoryFilter.module.scss";

type Props = {
  updateFilters: (key: EProductsParamsKeys.Category, value: string) => void;
  categories: ICategories;
  value?: string;
};

const CategoryFilter = ({ updateFilters, categories, value }: Props) => {
  if (!categories) return null;
  return (
    <div className={styles["category-filter"]}>
      <h4 className={styles["title"]}>Categories</h4>
      <ul className={styles["list"]}>
        <li className={styles["item"]}>
          <input
            id="all"
            type="checkbox"
            onChange={e => updateFilters(EProductsParamsKeys.Category, "")}
            checked={!value}
          />
          <label htmlFor="all" className={styles["label"]}>
            All
          </label>
        </li>
        {categories.map(c => (
          <li className={styles["item"]} key={c.id}>
            <input
              id={c.id}
              type="checkbox"
              onChange={e =>
                updateFilters(EProductsParamsKeys.Category, c.name)
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
