import Image from "next/image";

import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";
import Button from "@/components/ui/Button/Button";

import { IoShieldCheckmark } from "react-icons/io5";

import type { IProduct } from "@/interfaces/products.interface";

import styles from "./ProductCard.module.scss";

type Props = {
  product: IProduct;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles["product-card"]}>
      <div className={styles["heading"]}>
        <h3 className={styles["name"]}>{product.name}</h3>
        {product.rating && product.rating > 0 && (
          <ProductRating initialValue={product.rating} />
        )}
      </div>
      <div className={styles["wrapper"]}>
        <div className={styles["slider"]}>
          <div className={styles["main-image"]}>
            <Image
              width={1000}
              height={1000}
              alt={product.name}
              src={product.mainImage.path}
            />
          </div>
          <div className={styles["images"]}>
            {product.images.length &&
              product.images.map(i => (
                <div key={i.id}>
                  <Image
                    width={1000}
                    height={1000}
                    alt={product.name}
                    src={i.path}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className={styles["details"]}>
            <p className={styles["price"]}>${product.price}</p>
            {product.description &&<p className={`${styles["description"]} theme-color__gray`}>
              {product.description}
            </p>}
            {product.category && (
              <p className={styles["category"]}>{product.category.name}</p>
            )}
            <Button
              className={`${styles["cart-button"]} btn-primary`}
              text="Add to cart"
            />
          
          <p className={styles["secure"]}>
            <span className={styles["secure-icon"]}>
              <IoShieldCheckmark />
            </span>
            <span className={styles["secure-text"]}>secure transaction</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
