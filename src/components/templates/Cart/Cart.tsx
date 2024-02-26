"use client";
import cn from "clsx";
import { useCreateOrder } from "@/hooks/orders/useCreateOrder";
import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useAddProduct } from "@/hooks/cart/useAddProduct";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";

import Image from "next/image";
import Link from "next/link";

import CartItem from "@/components/modules/Cart/CartItem/CartItem";
import Button from "@/components/ui/Button/Button";

import styles from "./Cart.module.scss";

const Cart = () => {
  const createOrder = useCreateOrder();
  const fetchCart = useFetchCart();
  const addProduct = useAddProduct();
  const removeCartItem = useRemoveCartItem();

  const onOrderCreate = () => {
    // if (items.length) {
    //   const data = items.map(i => ({
    //     quantity: i.quantity,
    //     product: i.product.id
    //   }));
    //   createOrder.create(data);
    // }
  };

  const cartitems = fetchCart.cart?.items ? fetchCart.cart.items : null;
  const isLoading =
    fetchCart.isLoading || addProduct.isLoading || removeCartItem.isLoading;

  return (
    <div className={styles["shop-cart"]}>
      <h3 className={styles["title"]}>Cart</h3>
      <div className={styles["cart"]}>
        <div className={styles["cart-list"]}>
          {cartitems ? (
            cartitems.map(i => (
              <CartItem
                key={i.id}
                item={i}
                changeQuantity={addProduct.add}
                removeItem={removeCartItem.remove}
                isErrorAddProduct={addProduct.isError}
                isFullestItem={true}
              />
            ))
          ) : (
            <p>There is no products</p>
          )}
        </div>
        <div className={cn(styles["order"], "theme-bg__inverse")}>
          <Button
            text="Place order"
            loading={createOrder.isLoading}
            disabled={createOrder.isLoading}
            onClick={onOrderCreate}
          />
          <p>Total: ${fetchCart.cart?.subTotal ?? ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
