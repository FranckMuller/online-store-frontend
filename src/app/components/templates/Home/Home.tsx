import * as Api from "@/api";
import ProductsList from "@/app/components/modules/ProductsList/ProductsList";
import HomeHeader from './HomeHeader/HomeHeader'

import styles from "./Home.module.scss";

export const revalidate = 60;

const Home = async () => {
  const products = await Api.products.getAll();

  if (!products) return null;

  return (
    <section className={styles["home"]}>
      <div className={styles["header"]}><HomeHeader /></div>
      <ProductsList products={products} />
    </section>
  );
};

export default Home;
