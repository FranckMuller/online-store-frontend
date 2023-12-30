import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import AvatarMini from "@/components/modules/User/AvatarMini/AvatarMini";
import { MdDelete, MdEdit } from "react-icons/md";

import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReview.module.scss";

type Props = {
  review: IProductReview;
  userId?: string | null;
  deleteReview: (id: string) => void;
};

const ProductReview = ({ review, userId = null, deleteReview }: Props) => {
  return (
    <div className={styles["review"]}>
      <div className={styles["user-avatar"]}>
        <AvatarMini avatar={review.user?.avatarMini} />
      </div>
      <div className={styles["details"]}>
        <div className={styles["rating"]}>
          <ProductRating initialValue={review.rating} />
        </div>
        {review.text && <p className={styles["text"]}>{review.text}</p>}
        <p className={styles["username"]}>{review.user.username}</p>
      </div>

      {userId && userId === review.user.id && (
        <div className={styles["controls"]}>
          <button className={styles["edit-btn"]}>
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
  );
};

export default ProductReview;
