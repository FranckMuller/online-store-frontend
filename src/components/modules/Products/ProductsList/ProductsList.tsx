import { useFavorites } from "@/hooks/products/useFavorites";

import ProductItem from "../ProductItem/ProductItem";

import type { IProducts, IProduct } from "@/interfaces/products.interface";

import styles from "./ProductsList.module.scss";

type Props = {
  products: IProducts;
  columnCount?: "1" | "2" | "3" | "4";
  isShowedControls?: boolean;
};

const ProductsList = ({
  products,
  columnCount = "4",
  isShowedControls = false
}: Props) => {
  const { favoritesProductsIdx } = useFavorites();
  let columnCountClassName = `col-${columnCount}`;
  return (
    <div
      className={`${styles["products-list"]} ${styles[columnCountClassName]}`}
    >
      {products.length ? (
        products.map(p => {
          const isFavorite = favoritesProductsIdx?.includes(p.id);
          return (
            <div key={p.id} className={styles["item"]}>
              <ProductItem
                isFavorite={!!isFavorite}
                isShowedControls={isShowedControls}
                product={p}
              />
            </div>
          );
        })
      ) : (
        <p>Products not found</p>
      )}
    </div>
  );
};

export default ProductsList;
