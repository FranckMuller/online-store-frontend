import type { IProduct } from "@/interfaces/products.interface";
import Image from "next/image";
import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";

import styles from "./ProductCard.module.scss";

type Props = {
  product: IProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles["product-card"]}>
      <div className={styles["image"]}>
        <Image
          width={300}
          height={300}
          alt={product.name}
          src={`/${product.images[0]}`}
        />
      </div>
      <div className={styles["details"]}>
        <ProductRating />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
