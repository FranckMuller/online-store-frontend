import Rating from "@/components/ui/Rating/Rating";
import Checkbox from "@/components/ui/Checkbox/Checkbox";

import { updateRatingQueryString } from "@/utils/products-filters.utils";

import { EProductsFilterKeys } from "@/hooks/products/useProductsFilters";
import type {
  IProductsFilters,
  TRatingFilterValue,  
} from "@/interfaces/products.interface";

import styles from "./RatingFilter.module.scss";

const RATING_FILTERS_ITEMS: Array<TRatingFilterValue> = [1, 2, 3, 4, 5];

type Props = {
  currentValue?: string;
  updateFilters: (key: keyof IProductsFilters, value: string) => void;
};

const RatingFilter = ({ updateFilters, currentValue = "" }: Props) => {
  return (
    <div className={styles["rating-filter"]}>
      <p className={styles["title"]}>Rating</p>

      {RATING_FILTERS_ITEMS.map((value) => (
        <div className={styles["item"]} key={value}>
          <Checkbox
            id={`${EProductsFilterKeys.Rating}${value}`}
            isChecked={currentValue.split('|').includes(value.toString())}
            onChange={() =>
              updateFilters(
                EProductsFilterKeys.Rating,
                updateRatingQueryString(currentValue, value)
              )
            }
            label={<Rating initialValue={value} />}
          />
        </div>
      ))}
    </div>
  );
};

export default RatingFilter;
