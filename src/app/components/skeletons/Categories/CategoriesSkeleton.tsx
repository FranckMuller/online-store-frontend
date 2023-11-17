import CategorySkeleton from "./Category/CategorySkeleton";

import styles from "./CategoriesSkeleton.module.scss";

const CategoriesSkeleton = () => {
  return (
    <div className={styles["categories"]}>
      <div className={styles["category"]}>
        <CategorySkeleton />
      </div>
      <div className={styles["category"]}>
        <CategorySkeleton />
      </div>
      <div className={styles["category"]}>
        <CategorySkeleton />
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
