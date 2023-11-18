import { BsFillCartPlusFill } from "react-icons/bs";

import styles from "./ProductItemSkeleton.module.scss";

const ProductItemSkeleton = () => {
  return (
    <div className={`${styles["product-item"]} product-item`}>
      <div className={styles["content"]}>
        <div className={styles["image"]}></div>

        <div className={styles["details"]}>
          <h3 className={styles["name"]}>name</h3>
          <p className={styles["description"]}>description</p>
          <p className={styles["price"]}>price</p>
          <div className={styles["rating"]}></div>
          
          <div>
            <button className={styles["button"]}>
              <BsFillCartPlusFill />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
