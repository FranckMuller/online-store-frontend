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
        {product.reviews && <ProductReviews reviews={product.reviews} />}
      </div>

      <div className={styles["load-more-btn"]}>
        <button className='btn-link'>
          Load more
        </button>
      </div>

      <div className={styles["form"]}>
        <ReviewForm />
      </div>
    </div>
  );
};

export default BrowseProduct;
