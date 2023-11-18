import styles from "./CategorySkeleton.module.scss";

const CategorySkeleton = () => {
  return (
    <div className={`${styles["category"]} pulse-skeleton__white-dark`}>
      <p className={styles["name"]}>category name</p>
    </div>
  );
};

export default CategorySkeleton;
