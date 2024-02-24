"use client";
import { useCart } from "@/hooks/cart/useCart";
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";

import Image from "next/image";
import Link from "next/link";

import ProductQuantity from "@/components/modules/Cart/ProductQuantity/ProductQuantity";
import Button from "@/components/ui/Button/Button";

import styles from "./Cart.module.scss";

const Cart = () => {
  const { items, toggleProduct, incrementProduct, decrementProduct, amount } =
    useCart();

  const createOrder = useCreateOrder();

  const onOrderCreate = () => {
    if (items.length) {
      const data = items.map(i => ({
        quantity: i.quantity,
        product: i.product.id
      }));

      createOrder.create(data);
    }
  };

  return (
    <div className={styles["shop-cart"]}>
      <h3 className={styles["title"]}>Cart</h3>
      <div className={styles["cart"]}>
        <div className={styles["cart-list"]}>
          {items.length > 0 ? (
            items.map(i => (
              <div className={styles["cart-item"]}>
                <div className={styles["image"]}>
                  <Image
                    src={i.product.image ? i.product.image : ""}
                    alt={i.product.name}
                    width={150}
                    height={150}
                  />
                </div>

                <div className={styles["content"]}>
                  <p className={styles["name"]}>{i.product.name}</p>
                  <p className={styles["price"]}>${i.product.price}</p>
                  <p className={styles["shipping"]}>free shipping</p>

                  <div className={styles["quantity"]}>
                    {/*<ProductQuantity
                      quantityValue={i.quantity}
                      deleteHandler={() => toggleProduct(i.product)}
                    />*/}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>There is no products</p>
          )}
        </div>
        <div className={styles["order"]}>
          <Button
            text="Place order"
            loading={createOrder.isLoading}
            disabled={createOrder.isLoading}
            onClick={onOrderCreate}
          />
          <p>Total: ${amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
