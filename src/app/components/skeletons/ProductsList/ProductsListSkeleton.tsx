import ProductItemSkeleton from "../ProductItem/ProductItemSkeleton";

import styles from "./ProductsListSkeleton.module.scss";

const ProductsListSkeleton = () => {
  return (
    <div className={styles["products-list"]}>
      <div className={styles["item"]}>
        <ProductItemSkeleton />
      </div>
      <div className={styles["item"]}>
        <ProductItemSkeleton />
      </div>
      <div className={styles["item"]}>
        <ProductItemSkeleton />
      </div>
    </div>
  );
};

export default ProductsListSkeleton;
