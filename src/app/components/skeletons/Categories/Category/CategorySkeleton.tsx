import styles from "./CategorySkeleton.module.scss";

const CategorySkeleton = () => {
  return (
    <div className={styles["category"]}>
      <div className={styles["icon"]}></div>
      <p className={styles["name"]}></p>
    </div>
  );
};

export default CategorySkeleton;
