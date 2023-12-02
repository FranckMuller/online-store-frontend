import * as Api from "@/api";
import ProductsListSkeleton from "@/components/skeletons/ProductsList/ProductsListSkeleton";

import styles from "./HomeSkeleton.module.scss";

const HomeSkeleton = async () => {
  return (
    <section className={styles["home"]}>
      <ProductsListSkeleton />
    </section>
  );
};

export default HomeSkeleton;
