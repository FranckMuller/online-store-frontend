import Image from "next/image";
import Link from "next/link";
import type { IProduct } from "@/interfaces/products.interface";
import EditControls from "./EditControls/EditControls";
import AddToCartButton from "../Products/AddToCartButton/AddToCartButton";
import ProductRating from "../Products/ProductRating/ProductRating";

import styles from "./ProductItem.module.scss";

type Props = {
  product: IProduct;
};

// TODO optimize images on mobile
const ProductItem = ({ product }: Props) => {
  return (
    <div className={`${styles["product-item"]} product-item`}>
      <Link href={`products/${product.id}`}>
        <div className={styles["content"]}>
          <div className={styles["image"]}>
            <Image
              src={
                product.mainImage
                  ? product.mainImage.path
                  : `/${product.images[0]}`
              }
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
              <AddToCartButton productId={product.id} />
            </div>
          </div>

          <EditControls productId={product.id} />
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
