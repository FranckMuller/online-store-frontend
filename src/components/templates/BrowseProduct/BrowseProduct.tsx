import ProductCard from "@/components/modules/Products/ProductCard/ProductCard";
import ProductReviews from "@/components/modules/Products/ProductReviews/ProductReviews";

import type { IProduct } from "@/interfaces/products.interface";

import styles from "./BrowseProduct.module.scss";

type Props = {
  product: IProduct;
};

const BrowseProduct = ({ product }: Props) => {
  return (
    <div className={styles["browse-product"]}>
      <ProductCard product={product} />
      {product.reviews && <ProductReviews reviews={product.reviews} />}
    </div>
  );
};

export default BrowseProduct;
