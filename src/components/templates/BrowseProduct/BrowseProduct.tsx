import ProductCard from "@/components/modules/Products/ProductCard/ProductCard";
import ProductReviews from "@/components/modules/Reviews/ProductReviews/ProductReviews";
import ReviewForm from "@/components/modules/Reviews/ReviewForm/ReviewForm";

import type { IProduct } from "@/interfaces/products.interface";

import styles from "./BrowseProduct.module.scss";

type Props = {
  product: IProduct;
};

const BrowseProduct = ({ product }: Props) => {
  return (
    <div className={styles["browse-product"]}>
      <div className={styles["product"]}>
        <ProductCard product={product} />
      </div>
      <div className={styles["reviews"]}>
        {product.reviews && <ProductReviews productId={product.id} />}
      </div>
      
      <div className={styles["form"]}>
        <ReviewForm productId={product.id} />
      </div>
    </div>
  );
};

export default BrowseProduct;
