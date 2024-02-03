"use client";

import { useCart } from "@/hooks/cart/useCart";

import Image from "next/image";
import Link from "next/link";

import styles from "./Cart.module.scss";

const Cart = () => {
  const { items, onOrderCreate } = useCart();

  return (
    <div className={styles["shop-cart"]}>
      <div className={styles["cart"]}>
        <h3 className={styles["title"]}>Cart</h3>
        <div className={styles["cart-list"]}>
          {items.length > 0 ? (
            items.map(i => (
              <div className={styles["cart-item"]}>
                <div className={styles["image"]}>
                  <Image
                    src={i.product.image ? i.product.image : ""}
                    alt={i.product.name}
                    width={200}
                    height={200}
                  />
                </div>

                <div className={styles["content"]}>
                  <p className={styles["name"]}>{i.product.name}</p>
                  <p className={styles["price"]}>{i.product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>There is no products</p>
          )}
        </div>
      </div>

      <div className={styles["order"]}>
        <button onClick={onOrderCreate} className={styles["btn-primary"]}>Place order</button>
      </div>
    </div>
  );
};

export default Cart;
