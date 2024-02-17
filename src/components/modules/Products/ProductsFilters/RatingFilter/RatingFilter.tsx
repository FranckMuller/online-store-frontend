import Rating from "@/components/ui/Rating/Rating";
import Checkbox from "@/components/ui/Checkbox/Checkbox";

import { updateRatingQueryString } from "@/utils/products-filters.utils";

import {
  EProductsParamsKeys,
  type TRatingFilterValue
} from "@/interfaces/products.interface";

import styles from "./RatingFilter.module.scss";

const RatingFilterValues: Array<TRatingFilterValue> = [1, 2, 3, 4, 5];

type Props = {
  currentValue?: string;
  updateFilters: (key: EProductsParamsKeys.Rating, value: string) => void;
};

const RatingFilter = ({ updateFilters, currentValue = "" }: Props) => {
  return (
    <div className={styles["rating-filter"]}>
      <p className={styles["title"]}>Rating</p>

      {RatingFilterValues.map(value => (
        <div className={styles["item"]} key={value}>
          <Checkbox
            id={`${EProductsParamsKeys.Rating}${value}`}
            isChecked={
              currentValue
                ? currentValue.split("|").includes(value.toString())
                : false
            }
            onChange={() =>
              updateFilters(
                EProductsParamsKeys.Rating,
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
