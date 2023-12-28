import ProductReview from "@/components/modules/Reviews/ProductReview/ProductReview";

import type { IProductReviews } from "@/interfaces/reviews.interface";

import styles from "./ProductReviews.module.scss";

type Props = {
  reviews: IProductReviews;
};

const ProductReviews = ({ reviews }: Props) => {
  return (
    <div className={styles["reviews"]}>
      {reviews.map((r) => (
        <ProductReview key={r.id} review={r} />
      ))}
    </div>
  );
};

export default ProductReviews;
