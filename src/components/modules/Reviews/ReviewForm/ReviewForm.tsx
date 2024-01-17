"use client";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isAxiosError } from "axios";

import { useUser } from "@/hooks/useUser";
import { useReviews } from "../hooks/useReviews";

import AvatarMini from "@/components/modules/Profile/AvatarMini/AvatarMini";
import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";
import Error from "@/components/ui/Error/Error";
import { IoClose } from "react-icons/io5";

import * as Api from "@/api";

import type { IProductReviews } from "@/interfaces/reviews.interface";

import styles from "./ReviewForm.module.scss";

type Props = {
  productId: string;
};

const ReviewForm = ({ productId }: Props) => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [isShowed, setIsShowed] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const {
    createReview,
    isCreating,
    isCreatingSuccess,
    serverError,
    setServerError
  } = useReviews(productId);
  const user = useUser();

  useEffect(() => {
    if (isCreatingSuccess) {
      setRating(0);
      setText("");
      setIsShowed(false);
    }
  }, [isCreatingSuccess]);

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
    createReview({ rating, text });
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
                <button
                  disabled={isCreating}
                  className={`${styles["submit-button"]} btn-secondary ${
                    isCreating ? styles["loading"] : ""
                  }`}
                >
                  Send review
                  {isCreating && (
                    <div className={styles["spinner"]}>
                      <ElementSpinner />
                    </div>
                  )}
                </button>
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
