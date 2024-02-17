import PriceFilter from "./PriceFilter/PriceFilter";
import CategoryFilter from "./CategoryFilter/CategoryFilter";
import RatingFilter from "./RatingFilter/RatingFilter";

import type {
  EProductsParamsKeys,
  IFetchProductsParams
} from "@/interfaces/products.interface";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./ProductsFilters.module.scss";

type Props = {
  updateFilters: (key: EProductsParamsKeys, value: string) => void;
  categories: ICategories;
  filtersParams: IFetchProductsParams;
};

const ProductsFilters = ({
  updateFilters,
  categories,
  filtersParams
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
      {categories && (
        <div className={styles["category"]}>
          <CategoryFilter
            value={filtersParams.category}
            updateFilters={updateFilters}
            categories={categories}
          />
        </div>
      )}
      <div className={styles["rating"]}>
        <RatingFilter
          currentValue={filtersParams.rating}
          updateFilters={updateFilters}
        />
      </div>
    </div>
  );
};

export default ProductsFilters;
