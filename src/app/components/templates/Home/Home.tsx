import * as Api from "@/api";
import ProductsList from "@/app/components/modules/ProductsList/ProductsList";
import HomeHeader from "./HomeHeader/HomeHeader";
import Categories from "@/app/components/modules/Categories/Categories";

import styles from "./Home.module.scss";

export const revalidate = 60;

const Home = async () => {
  const products = await Api.products.getAll();

  if (!products) return null;

  return (
    <section className={styles["home"]}>
      <div className={styles["header"]}>
        <HomeHeader />
      </div>
      <div className={styles["categories"]}></div>
      <Categories /> 
      <ProductsList products={products} />
    </section>
  );
};

export default Home;
