import type {TRatingFilterValue} from '@/interfaces/products.interface'

export const updateRatingQueryString = (
  currentValue: string,
  value: TRatingFilterValue
) => {
  const newValue = value.toString();
  const ratingArr = currentValue ? currentValue.split("|") : [];
  const existValueIdx = ratingArr.indexOf(newValue);
  if (existValueIdx !== -1) {
    ratingArr.splice(existValueIdx, 1);
  } else {
    ratingArr.push(newValue);
  }
  return ratingArr.join("|");
};
