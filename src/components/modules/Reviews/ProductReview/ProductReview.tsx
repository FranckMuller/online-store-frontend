import { useState, useEffect, useRef } from "react";

import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";
import AvatarMini from "@/components/modules/Profile/AvatarMini/AvatarMini";
import Error from "@/components/ui/Error/Error";
import Button, { EButtonVariants } from "@/components/ui/Button/Button";
import { MdDelete, MdEdit } from "react-icons/md";

import { useRemoveReview } from "@/hooks/reviews/useRemoveReview";
import { useUpdateReview } from "@/hooks/reviews/useUpdateReview";

import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReview.module.scss";

type Props = {
  review: IProductReview;
  userId?: string | null;
  productId: string;
};

const ProductReview = ({ review, userId = null, productId }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [serverError, setServerError] = useState("");
  const [error, setSrror] = useState("");

  const removeReview = useRemoveReview(productId);
  const updateReview = useUpdateReview(productId, review.id);

  useEffect(() => {
    if (updateReview.isSuccess && isEditMode) {
      setIsEditMode(false);
    }
  }, [updateReview.isSuccess]);

  useEffect(() => {
    if (review?.text) {
      setText(review.text);
    }
    setRating(review.rating);
  }, [review]);

  useEffect(() => {
    const error = removeReview.error ?? updateReview.error;
    if (error) {
      setServerError(error);
    }
  }, [removeReview.error, updateReview.error]);

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

  const onTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
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
              handleRating={setRating}
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
                  <Button
                    text="Save"
                    loading={updateReview.isLoading}
                    onClick={() => updateReview.update({ rating, text })}
                    disabled={updateReview.isLoading}
                    customClass={styles["save-btn"]}
                    variant={EButtonVariants.Secondary}
                  />
                </div>

                {serverError && <Error text={serverError} />}
              </div>
              <button
                onClick={() => setIsEditMode(false)}
                className={`${styles["save-btn"]} btn-link`}
              >
                cancel
              </button>
            </div>
          )}
        </div>

        {userId && userId === review.user.id && !isEditMode && (
          <div className={styles["controls"]}>
            <button onClick={() => setIsEditMode(true)} className={styles["edit-btn"]}>
              <MdEdit />
            </button>
            <button
              onClick={() => removeReview.remove(review.id)}
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
