import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import AvatarMini from "@/components/modules/User/AvatarMini/AvatarMini";
import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReview.module.scss";

type Props = {
  review: IProductReview;
};

const ProductReview = ({ review }: Props) => {
  return (
    <div className={styles["preview"]}>
      <div className={styles["user-avatar"]}>
        <AvatarMini
          avatar={review.user.avatarMini ? review.user.avatarMini : undefined}
        />
      </div>
      <div className={styles["details"]}>
        <div className={styles["rating"]}>
        
        <ProductRating initialValue={review.rating} />
        </div>
        {review.text && <p className={styles['text']}>{review.text}</p>}
        <p className={styles["username"]}>{review.user.username}</p>
      </div>
    </div>
  );
};

export default ProductReview;
