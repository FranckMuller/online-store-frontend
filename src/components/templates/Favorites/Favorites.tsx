"use client";

import { useFavorites } from "@/hooks/products/useFavorites";

import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

import styles from "./Favorites.module.scss";

const Favorites = () => {
  const { isFetchingProducts, favoritesProducts } = useFavorites();

  if (isFetchingProducts) return <PageSpinner isLoading={isFetchingProducts} />;

  return (
    <div className={styles["favorites"]}>
      <h3 className={styles["title"]}>Favorites products</h3>
      {favoritesProducts?.length ? (
        <ProductsList products={favoritesProducts} />
      ) : (
        "there is no products"
      )}
    </div>
  );
};

export default Favorites;
