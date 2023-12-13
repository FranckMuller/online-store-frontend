import PriceFilter from "./PriceFilter/PriceFilter";
import CategoryFilter from "./CategoryFilter/CategoryFilter";

import type { IProductsFilters } from "@/interfaces/products.interface";

import styles from "./ProductsFilters.module.scss";

type Props = {
  updateFilters: (key: keyof IProductsFilters, value: string) => void;
};

const ProductsFilters = ({ updateFilters }: Props) => {
  return (
    <div className={styles["filters"]}>
      <div className={styles["price"]}>
        <PriceFilter updateFilters={updateFilters} />
      </div>
      <div className={styles["category"]}>
        <CategoryFilter />
      </div>
    </div>
  );
};

export default ProductsFilters;
