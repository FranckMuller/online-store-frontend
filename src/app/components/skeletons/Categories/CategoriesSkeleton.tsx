import CategorySkeleton from "./Category/CategorySkeleton";

import styles from "./CategoriesSkeleton.module.scss";

const CategoriesSkeleton = () => {
  return (
    <div className={styles["categories"]}>
    {[...Array(6)].map((i, idx) => (
      <div key={idx} className={styles["category"]}>
        <CategorySkeleton />
      </div>
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
