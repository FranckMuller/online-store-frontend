'use client'

import { useMe } from "@/hooks/useMe";

import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import HomeHeader from "./HomeHeader/HomeHeader";

import type { IProducts } from "@/interfaces/products.interface";

import styles from "./Home.module.scss";

type Props = {
  products: IProducts;
};

const Home = async ({ products }: Props) => {
  const { isAuthed } = useMe();
  return (
    <section className={styles["home"]}>
      <h3 className={styles["title"]}>Freshed products</h3>
      <ProductsList isShowedControls={isAuthed} products={products} />
    </section>
  );
};

export default Home;
