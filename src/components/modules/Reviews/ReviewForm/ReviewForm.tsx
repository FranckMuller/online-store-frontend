"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import AvatarMini from "@/components/modules/User/AvatarMini/AvatarMini";
import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";

import styles from "./ReviewForm.module.scss";

const ReviewForm = () => {
  const [isShowed, setIsShowed] = useState(false);
  const [rating, setRating] = useState(0);
  const user = useUser();

  if (!user) return null;

  const toggleForm = () => {
    setIsShowed(!isShowed);
  };

  const onClickRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = (e: any) => {};

  return (
    <div className={styles["review-form"]}>
      {isShowed && (
        <div className={styles["form-wrapper"]}>
          <form className={styles["form"]} onSubmit={handleSubmit}>
            <div className={styles["fields"]}>
              <div className={styles["rating"]}>
                <ProductRating
                disabled={false}
                  handleRating={onClickRating}
                  initialValue={rating}
                />
              </div>

              <div className={styles["form-group"]}>
                <textarea
                  value={""}
                  placeholder="Enter your review comment"
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className={styles["error-button-wrap"]}>
              {false && <span className={styles["error"]}>error</span>}
              <div className={styles["button-wrap"]}>
                <button className={`${styles["submit-button"]} btn-secondary`}>
                  Send review
                </button>
              </div>
            </div>
          </form>

          <div className={styles["user-avatar"]}>
            <AvatarMini avatar={user.avatarMini} />
          </div>
        </div>
      )}
      {!isShowed && (
        <button
          onClick={toggleForm}
          className={`${styles["open-btn"]} btn-primary`}
        >
          Leave review
        </button>
      )}
    </div>
  );
};

export default ReviewForm;
