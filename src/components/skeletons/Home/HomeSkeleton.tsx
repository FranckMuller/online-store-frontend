import * as Api from "@/api";
import ProductsListSkeleton from "@/components/skeletons/ProductsList/ProductsListSkeleton";
import HomeHeaderSkeleton from "./HomeHeader/HomeHeaderSkeleton";
import CategoriesSkeleton from "@/components/skeletons/Categories/CategoriesSkeleton";

import styles from "./HomeSkeleton.module.scss";

const HomeSkeleton = async () => {
  return (
    <section className={styles["home"]}>
      <div className={styles["header"]}>
        <HomeHeaderSkeleton />
      </div>
      <div className={styles["categories"]}>
        <CategoriesSkeleton />
      </div>
      <ProductsListSkeleton />
    </section>
  );
};

export default HomeSkeleton;
