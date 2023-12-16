import PriceFilter from "./PriceFilter/PriceFilter";
import CategoryFilter from "./CategoryFilter/CategoryFilter";

import type { IProductsFilters } from "@/interfaces/products.interface";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./ProductsFilters.module.scss";

type Props = {
  updateFilters: (key: keyof IProductsFilters, value: string, category?: string) => void;
  categories: ICategories;
  filtersParams: IProductsFilters
};

const ProductsFilters = ({
  updateFilters,
  categories,
  filtersParams,
}: Props) => {
  return (
    <div className={styles["filters"]}>
      <div className={styles["price"]}>
        <PriceFilter
          initialFromValue={filtersParams.minPrice}
          initialToValue={filtersParams.maxPrice}
          updateFilters={updateFilters}
        />
      </div>
      <div className={styles["category"]}>
        <CategoryFilter
          initialValue={filtersParams.category}
          updateFilters={updateFilters}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ProductsFilters;
