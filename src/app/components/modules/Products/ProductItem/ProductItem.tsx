import Image from "next/image";
import Link from "next/link";
import type { IProduct } from "@/interfaces/products.interface";
import AdminProductControls from "../AdminProductControls/AdminProductControls";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import ProductRating from "../ProductRating/ProductRating";

import styles from "./ProductItem.module.scss";

type Props = {
  product: IProduct;
};

const ProductItem = ({ product }: Props) => {
  return (
    <div className={styles["product-item"]}>
      <Link href={`/products/${product.id}`}>
        <div className={styles["content"]}>
          <div className={styles["image"]}>
            <Image
              src={`/${product.images[0]}`}
              alt={product.name}
              width={200}
              height={200}
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

          <AdminProductControls productId={product.id} />
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
