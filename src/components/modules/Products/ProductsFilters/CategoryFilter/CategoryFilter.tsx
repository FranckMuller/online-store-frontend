import { useState } from "react";
import { EProductsFilterKeys } from "@/hooks/products/useProductsFilters";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";
import type { IProductsFilters } from "@/interfaces/products.interface";

import styles from "./CategoryFilter.module.scss";

type Props = {
  updateFilters: (
    key: keyof IProductsFilters,
    value: string,
    category?: string
  ) => void;
  categories: ICategories;
  initialValue?: string;
};

const CategoryFilter = ({ updateFilters, categories, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue || "");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    name: string
  ) => {
    updateFilters(EProductsFilterKeys.Category, id, name);
    setValue(name)
  };

  return (
    <div className={styles["category-filter"]}>
      <h4 className={styles["title"]}>Categories</h4>
      <ul className={styles["list"]}>
        {categories.map((c) => (
          <li className={styles["item"]} key={c.id}>
            <input
              id={c.id}
              type="checkbox"
              onChange={(e) => onChange(e, c.id, c.name)}
              value={c.id}
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
