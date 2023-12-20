import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReview.module.scss";

type Props = {
  review: IProductReview;
};

const ProductReview = ({ review }: Props) => {
  return <div>Product review</div>;
};

export default ProductReview;
