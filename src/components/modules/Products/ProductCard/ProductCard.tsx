import Image from "next/image";

import ProductRating from "@/components/modules/Products/ProductRating/ProductRating";

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
        <ProductRating />
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
              product.images.map((i) => (
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
          <p className={styles["description"]}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            dolore nisi rerum, culpa, nam sequi animi quod perferendis ipsum
            nesciunt aut, deleniti quaerat quam necessitatibus consequuntur
            neque possimus dolores quidem.
          </p>
          {product.category && (
            <p className={styles["category"]}>{product.category.name}</p>
          )}
          <button>Add to cart</button>
          <p className={styles["bottom-text"]}>secure transaction</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
