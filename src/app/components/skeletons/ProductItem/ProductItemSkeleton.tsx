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

          <div className={styles["button"]}>
            <div className={styles["add-button"]}>add</div>
          </div>
        </div>

        <div className={styles["edit-controls"]}>edit</div>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
