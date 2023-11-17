import * as Api from "@/api";
import ProductsListSkeleton from "@/app/components/skeletons/ProductsList/ProductsListSkeleton";
import HomeHeaderSkeleton from "./HomeHeader/HomeHeaderSkeleton";
import CategoriesSkeleton from "@/app/components/skeletons/Categories/CategoriesSkeleton";

import styles from "./HomeSkeleton.module.scss";

export const revalidate = 60;

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
