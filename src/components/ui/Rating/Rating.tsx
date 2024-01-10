"use client";
import { Rating } from "react-simple-star-rating";

import styles from "./Rating.module.scss";

type Props = {
  initialValue?: number;
  handleRating?: (rate: number) => void;
  disabled?: boolean;
  size?: number;
};

const ProductRating = ({
  initialValue = 0,
  handleRating,
  disabled = true,
}: Props) => {
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) => {
    console.log(value, index);
  };

  return (
    <div className={styles["product-rating"]}>
      <Rating
        onClick={handleRating}
        iconsCount={5}
        fillColor="#fecb00"
        size={15}
        initialValue={initialValue}
        readonly={disabled}
      />
    </div>
  );
};

export default ProductRating;
