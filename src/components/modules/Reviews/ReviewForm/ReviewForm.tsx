"use client";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { isAxiosError } from "axios";
import * as Api from "@/api";
import { IoClose } from "react-icons/io5";
import AvatarMini from "@/components/modules/User/AvatarMini/AvatarMini";
import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";
import Error from "@/components/ui/Error/Error";

import type { ReviewData } from "@/api/reviews";
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
  const [serverError, setServerError] = useState("");
  const user = useUser();

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: (data: ReviewData) => Api.reviews.create(data, productId),
    onSuccess: (data) => {
      queryClient.setQueryData(["reviews", productId], (prev: any) => {
        setRating(0);
        setText("");
        setIsShowed(false);
        return prev ? [data, ...prev] : [data];
      });
    },
    onError: (err) => {
      console.log(err);
      if (err && isAxiosError(err)) {
        setServerError(err.response?.data?.message);
      }
    },
  });

  if (!user) return null;

  const toggleForm = () => {
    setIsShowed(!isShowed);
  };

  const onClickRating = (rate: number) => {
    if (error) {
      setError("");
    }

    if (serverError) {
      setServerError("");
    }

    setRating(rate);
  };

  const onTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);

    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating || rating < 1) {
      setError("Required field");
      return;
    }
    submitForm({ rating, text });
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

                {error && <Error style={{marginLeft: '5px'}} text={error} />}
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
                  disabled={isLoading}
                  className={`${styles["submit-button"]} btn-secondary ${
                    isLoading ? styles["loading"] : ""
                  }`}
                >
                  Send review
                  {isLoading && (
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
