import { BsFillCartPlusFill } from "react-icons/bs";

import styles from "./ProductItemSkeleton.module.scss";

const ProductItemSkeleton = () => {
  return (
    <div className={`${styles["product-item"]} product-item`}>
      <div className={styles["content"]}>
        <div className={`${styles["image"]} pulse-skeleton__white`}></div>

        <div className={styles["details"]}>
          <h3 className={`${styles["name"]} pulse-skeleton__white`}>name</h3>
          <p className={`${styles["description"]} pulse-skeleton__white`}>
            description
          </p>
          <p className={`${styles["price"]} pulse-skeleton__blue`}>price</p>
          <div className={styles["rating"]}></div>

          <div>
            <button className={`${styles["button"]} pulse-skeleton__blue`}>
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
