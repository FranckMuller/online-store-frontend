import * as Api from "@/api";
import ProductsList from "@/app/components/modules/ProductsList/ProductsList";
import HomeHeader from "./HomeHeader/HomeHeader";
import Categories from "@/app/components/modules/Categories/Categories";

import styles from "./Home.module.scss";

export const revalidate = 60;

const Home = async () => {
  const products = await Api.products.getAll();
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <section className={styles["home"]}>
      <div className={styles["header"]}>
        <HomeHeader />
      </div>
      <div className={styles["categories"]}>
        <Categories />
      </div>
      <ProductsList products={products} />
    </section>
  );
};

export default Home;
