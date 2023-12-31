import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Api from "@/api";

import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";
import AvatarMini from "@/components/modules/User/AvatarMini/AvatarMini";
import Error from "@/components/ui/Error/Error";

import { MdDelete, MdEdit } from "react-icons/md";

import type { IProductReview } from "@/interfaces/reviews.interface";
import type { ReviewData } from "@/api/reviews";

import styles from "./ProductReview.module.scss";

type Props = {
  review: IProductReview;
  userId?: string | null;
  deleteReview: (id: string) => void;
  productId: string;
};

const ProductReview = ({
  review,
  userId = null,
  deleteReview,
  productId,
}: Props) => {
  const queryClient = useQueryClient();
  const { mutate: updateReview, isLoading } = useMutation({
    mutationFn: (data: ReviewData) => Api.reviews.update(data, review.id),
    onSuccess: (review: IProductReview) => {
      queryClient.setQueryData(["reviews", productId], (old: any) =>
        old.map((r: IProductReview) => {
          if (r.id === review.id) return review;
          return r;
        })
      );
      setIsEditMode(false);
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [serverError, setServerError] = useState("");
  const [error, setSrror] = useState("");

  useEffect(() => {
    if (review?.text) {
      setText(review.text);
    }
    setRating(review.rating);
  }, [review]);

  useEffect(() => {
    if (review?.text && text !== review.text) {
      setText(review.text);
    }

    if (isEditMode && textareaRef?.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(text.length, text.length);
      // textareaRef.current.selectionEnd = text.length
    }
  }, [isEditMode]);

  const onToggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const onTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const onRatingChange = (value: number) => {
    setRating(value);
  };

  const onUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateReview({ rating, text });
  };

  const isRatingDisabled = isEditMode ? false : true;

  return (
    <>
      <div className={styles["review"]}>
        <div className={styles["user-avatar"]}>
          <AvatarMini avatar={review.user?.avatarMini} />
        </div>
        <div className={styles["details"]}>
          <div className={styles["rating"]}>
            <ProductRating
              disabled={isRatingDisabled}
              initialValue={review.rating}
              handleRating={onRatingChange}
            />
          </div>
          {!isEditMode && review.text && (
            <p className={styles["text"]}>{review.text}</p>
          )}
          {isEditMode && (
            <div className={styles["textarea-field"]}>
              <textarea
                onChange={onTextChange}
                ref={textareaRef}
                value={text}
                placeholder="Enter your review comment"
              />
            </div>
          )}
          {!isEditMode && (
            <p className={styles["username"]}>{review.user.username}</p>
          )}

          {isEditMode && (
            <div className={styles["edit-controls"]}>
              <div className={styles["error-button-wrap"]}>
                <div className={styles["button-wrap"]}>
                  <button
                    onClick={onUpdate}
                    disabled={isLoading}
                    className={`${styles["save-btn"]} btn-secondary ${
                      isLoading ? styles["loading"] : ""
                    }`}
                  >
                    Save
                    {isLoading && (
                      <div className={styles["spinner"]}>
                        <ElementSpinner />
                      </div>
                    )}
                  </button>
                </div>

                {serverError && <Error text={serverError} />}
              </div>
              <button
                onClick={onToggleEditMode}
                className={`${styles["save-btn"]} btn-link`}
              >
                cancel
              </button>
            </div>
          )}
        </div>

        {userId && userId === review.user.id && !isEditMode && (
          <div className={styles["controls"]}>
            <button onClick={onToggleEditMode} className={styles["edit-btn"]}>
              <MdEdit />
            </button>
            <button
              onClick={() => deleteReview(review.id)}
              className={styles["delete-btn"]}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReview;
