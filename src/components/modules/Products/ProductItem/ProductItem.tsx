import Image from "next/image";
import Link from "next/link";

import EditControls from "../EditControls/EditControls";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductRating from "../ProductRating/ProductRating";

import type { IProduct } from "@/interfaces/products.interface";

import styles from "./ProductItem.module.scss";

type Props = {
  product: Omit<IProduct, "images">;
};

// TODO optimize images on mobile
const ProductItem = ({ product }: Props) => {
  return (
    <div className={styles["product-item"]}>
      <div className={styles["content"]}>
        <Link href={`catalog/${product.id}`}>
          <div className={styles["image"]}>
            <Image
              src={product.mainImage ? product.mainImage.path : ""}
              alt={product.name}
              width={150}
              height={150}
            />

            <div className={styles["button"]}>
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        </Link>

        <div className={styles["details"]}>
          <h3 className={styles["name"]}>{product.name}</h3>
          {product.category && (
            <p className={styles["category"]}>{product.category.name}</p>
          )}
          {product.rating && product.rating > 0 && (
            <div className={styles["rating"]}>
              <ProductRating initialValue={product.rating} />
              <span className={styles["reviews"]}>
                <Link href={`catalog/${product.id}#reviews`}>
                  {product.totalReviews}{" "}
                  {product.totalReviews === 1 ? "review" : "reviews"}
                </Link>
              </span>
            </div>
          )}
          <p className={styles["price"]}>${product.price}</p>
        </div>

        <EditControls productId={product.id} />
      </div>
    </div>
  );
};

export default ProductItem;
