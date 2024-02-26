import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useAddProduct } from "@/hooks/cart/useAddProduct";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";
import { withClickOutside } from "@/utils/withClickOutside";

import CartItem from "@/components/modules/Cart/CartItem/CartItem";
import Spinner from "@/components/ui/Spinner/Spinner";
import { CiShoppingCart } from "react-icons/ci";

import type { DropdownProps } from "@/utils/withClickOutside";

import styles from "./CartDropdown.module.scss";

const CartDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ opened, toggleDropdown }, ref) => {
    const fetchCart = useFetchCart();
    const addProduct = useAddProduct();
    const removeCartItem = useRemoveCartItem();
    
    const cartItems = fetchCart.cart?.items ? fetchCart.cart?.items : null;
    const isLoading =
      fetchCart.isLoading || addProduct.isLoading || removeCartItem.isLoading;

    return (
      <div ref={ref} className={styles["cart-dropdown"]}>
        <button
          onClick={() => toggleDropdown(!opened)}
          className={styles["cart-dropdown-btn"]}
        >
          <CiShoppingCart />
          {cartItems && cartItems?.length > 0 && (
            <span className={styles["count"]}>{cartItems.length}</span>
          )}
        </button>
        {opened && (
          <div className={styles["dropdown-wrapper"]}>
            <div className={`${styles["dropdown"]} theme-bg__inverse`}>
              <h3 className={styles["title"]}>My cart</h3>
              {cartItems &&
                cartItems.map(i => (
                  <CartItem
                    key={i.id}
                    item={i}
                    changeQuantity={addProduct.add}
                    removeItem={removeCartItem.remove}
                    isErrorAddProduct={addProduct.isError}
                  />
                ))}

              <div className={styles["total"]}>
                <p className={styles["total-title"]}>Total:</p>
                <p className={styles["total-price"]}>
                  ${fetchCart.cart?.subTotal ?? ""}
                </p>
              </div>
              <Link
                className={`${styles["checkout-link"]} theme-bg`}
                href="/profile/cart"
              >
                Place order
              </Link>
              {isLoading && (
                <div className={styles["spinner-wrapper"]}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CartDropdown.displayName = "CartDropdown";

export default withClickOutside(CartDropdown);
