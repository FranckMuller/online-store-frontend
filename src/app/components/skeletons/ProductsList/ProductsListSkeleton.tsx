import ProductItemSkeleton from "../ProductItem/ProductItemSkeleton";

import styles from "./ProductsListSkeleton.module.scss";

const ProductsListSkeleton = () => {
  return (
    <div className={styles["products-list"]}>
    {[...Array(4)].map((i, idx) => (
      
      <div key={idx} className={styles["item"]}>
        <ProductItemSkeleton />
      </div>
    ))}
    
    
    </div>
  );
};

export default ProductsListSkeleton;
