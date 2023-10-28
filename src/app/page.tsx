import * as Api from "@/api";
import ProductsList from "@/app/components/modules/Products/ProductsList/ProductsList";

import styles from "./page.module.css";

export const revalidate = 60;

const Home = async () => {
  const products = await Api.products.getAll();

  if (!products) return null;

  return (
    <section>
      <div>
        <ProductsList products={products} />
      </div>
    </section>
  );
};

export default Home;
