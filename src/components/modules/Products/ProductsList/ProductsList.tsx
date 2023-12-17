import ProductItem from "../ProductItem/ProductItem";
import type { IProducts, IProduct } from "@/interfaces/products.interface";

import styles from "./ProductsList.module.scss";

type Props = {
  products: IProducts;
  columnCount?: "1" | "2" | "3" | "4";
};

const ProductsList = ({ products, columnCount = "4" }: Props) => {
  let columnCountClassName = `col-${columnCount}`;
  return (
    <div
      className={`${styles["products-list"]} ${styles[columnCountClassName]}`}
    >
      {products.length ? (
        products.map((p) => (
          <div key={p.id} className={styles["item"]}>
            <ProductItem product={p} />
          </div>
        ))
      ) : (
        <p>Products not found</p>
      )}
    </div>
  );
};

export default ProductsList;
