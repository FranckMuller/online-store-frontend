import Image from "next/image";
import Link from "next/link";
import type { IProduct } from "@/interfaces/products.interface";
import AddToCartButton from "@/components/modules/Products/AddToCartButton/AddToCartButton";
import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";

import styles from "./PreviewItem.module.scss";

type Props = {
  product: Omit<IProduct, "images" | "id" | "category">;
};

// TODO optimize images on mobile
const PreviewItem = ({ product }: Props) => {
  return (
    <div className={`${styles["product-item"]} product-item`}>
      <div className={styles["content"]}>
        <div className={styles["image"]}>
          <Image
            src={product.mainImage ? product.mainImage.path : ""}
            alt={product.name}
            width={200}
            height={200}
            className="hidden md:block"
          />
        </div>

        <div className={styles["details"]}>
          <h3 className={styles["name"]}>{product.name}</h3>
          <p className={styles["description"]}>{product.description}</p>
          <p className={styles["price"]}>${product.price}</p>
          <ProductRating />

          <div className={styles["button"]}>
            <AddToCartButton productId={`1`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewItem;
