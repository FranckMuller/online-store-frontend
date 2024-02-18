"use client";
import { useState, useEffect } from "react";

import { useMe } from "@/hooks/auth/useMe";
import { useCreateReview } from "@/hooks/reviews/useCreateReview";

import AvatarMini from "@/components/modules/Profile/AvatarMini/AvatarMini";
import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";
import Error from "@/components/ui/Error/Error";
import Button, { EButtonVariants } from "@/components/ui/Button/Button";
import { IoClose } from "react-icons/io5";

import * as Api from "@/api";

import type { IProductReviews } from "@/interfaces/reviews.interface";

import styles from "./ReviewForm.module.scss";

type Props = {
  productId: string;
};

const ReviewForm = ({ productId }: Props) => {
  const [text, setText] = useState("");
  const [isShowed, setIsShowed] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  
  const createReview = useCreateReview(productId);
  const { user } = useMe();

  useEffect(() => {
    if (createReview.isSuccess) {
      setRating(0);
      setText("");
      setIsShowed(false);
    }
  }, [createReview.isSuccess]);

  useEffect(() => {
    if (createReview.error) {
      setServerError(createReview.error);
    }
  }, [createReview.error]);

  if (!user) return null;

  const resetErrors = () => {
    if (error) {
      setError("");
    }
    if (serverError) {
      setServerError("");
    }
  };

  const toggleForm = () => {
    resetErrors();
    setIsShowed(!isShowed);
  };

  const onClickRating = (rate: number) => {
    resetErrors();
    setRating(rate);
  };

  const onTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    resetErrors();
    setText(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating || rating < 1) {
      setError("Required field");
      return;
    }
    createReview.create({ rating, text });
  };

  return (
    <div className={styles["review-form"]}>
      {isShowed && (
        <div className={styles["form-wrapper"]}>
          <form onSubmit={handleSubmit} className={styles["form"]}>
            <div className={styles["fields"]}>
              <div className={styles["rating"]}>
                <ProductRating
                  disabled={false}
                  handleRating={onClickRating}
                  initialValue={rating}
                />

                {error && <Error style={{ marginLeft: "5px" }} text={error} />}
              </div>

              <div className={styles["form-group"]}>
                <textarea
                  value={text}
                  placeholder="Enter your review comment"
                  onChange={onTextChange}
                />
              </div>

              <button
                onClick={toggleForm}
                type="button"
                className={styles["close-btn"]}
              >
                <IoClose />
              </button>
            </div>

            <div className={styles["error-button-wrap"]}>
              <div className={styles["button-wrap"]}>
                <Button
                  text="Send review"
                  disabled={createReview.isLoading}
                  variant={EButtonVariants.Secondary}
                  loading={createReview.isLoading}
                />
              </div>

              {serverError && <Error text={serverError} />}
            </div>
          </form>

          <div className={styles["user-avatar"]}>
            <AvatarMini avatar={user.avatarMini} />
          </div>
        </div>
      )}
      {!isShowed && (
        <Button
          text="Leave review"
          onClick={toggleForm}
          customClass={styles["open-btn"]}
        />
      )}
    </div>
  );
};

export default ReviewForm;
