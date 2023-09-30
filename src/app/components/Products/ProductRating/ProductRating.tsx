"use client";
import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";

import styles from "./ProductRating.module.scss";

const ProductRating = () => {
  const [rating, setRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  useEffect(() => {
    setIsVisible(true)
    
  }, []);

  return (
    <div className={styles["product-rating"]}>
      {isVisible ? (
        <Rating
          onClick={handleRating}
          iconsCount={5}
          fillColor="#fecb00"
          size={15}
          initialValue={3}
        />
      ) : null}
    </div>
  );
};

export default ProductRating;
