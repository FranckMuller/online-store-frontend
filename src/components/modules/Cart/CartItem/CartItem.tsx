import { useState, useEffect } from "react";
import Image from "next/image";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import Rating from "@/components/ui/Rating/Rating";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import type { TCartItem, TProductData } from "@/types/cart.types";

import styles from "./CartItem.module.scss";

type Props = {
  item: TCartItem;
  changeQuantity: ({ productId, quantity }: TProductData) => void;
  removeItem: (id: string) => void;
  isErrorAddProduct: boolean;
  isFullestItem?: boolean;
};

const CartItem = ({
  item,
  changeQuantity,
  removeItem,
  isErrorAddProduct,
  isFullestItem
}: Props) => {
  const [quantity, setQuantity] = useState<number | undefined>(item.quantity);

  const debouncedChangeQuantity = useDebouncedCallback(changeQuantity, 1000);

  const сhangeQuantity = (value: number | string) => {
    if (!value || value === "0") {
      setQuantity(undefined);
      return;
    }

    setQuantity(+value);
    if (+value > 0) {
      debouncedChangeQuantity({
        productId: item.product.id,
        quantity: +value
      });
    }
  };

  useEffect(() => {
    if (isErrorAddProduct) {
      setQuantity(item.quantity);
    }
  }, [isErrorAddProduct]);

  const description =
    isFullestItem && item.product.description ? item.product.description : null;
  const rating =
    isFullestItem && item.product.averageRating
      ? item.product.averageRating
      : null;

  return (
    <div className={styles["cart-item"]} key={item.product.id}>
      <div className={styles["product"]}>
        <div className={styles["product-image"]}>
          <Image
            src={item.product.mainImage.path}
            alt={item.product.name}
            width={150}
            height={150}
          />
        </div>
        <div className={styles["product-info"]}>
          {rating && <Rating initialValue={rating} />}
          <p className={styles["product-name"]}>{item.product.name}</p>
          {description && (
            <div className={styles["product-description"]}>{description}</div>
          )}
          <p className={styles["product-price"]}>${item.product.price}</p>
          <ProductQuantity
            quantityValue={quantity}
            onChangeQuantity={сhangeQuantity}
            onDeleteItem={() => removeItem(item.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
