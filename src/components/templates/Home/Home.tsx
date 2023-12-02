import * as Api from "@/api";
import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import HomeHeader from "./HomeHeader/HomeHeader";

import styles from "./Home.module.scss";

export const revalidate = 60;

const Home = async () => {
  const products = await Api.products.getAll();

  return (
    <section className={styles["home"]}>
      <h3 className={styles['title']}>Freshed products</h3>
      <ProductsList products={products} />
    </section>
  );
};

export default Home;
