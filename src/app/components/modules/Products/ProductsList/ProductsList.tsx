import ProductItem from "../../ProductItem/ProductItem";
import type { IProducts, IProduct } from "@/interfaces/products.interface";

import styles from "./ProductsList.module.scss";

type Props = {
  products: IProducts;
};

const ProductsList = ({ products }: Props) => {
  return (
    <div className={styles['products-list']}>
      {products.length ? (
        products.map((p) => <div className={styles['item']}><ProductItem key={p.id} product={p} /></div>)
      ) : (
        <p>Products not found</p>
      )}
    </div>
  );
};

export default ProductsList;
