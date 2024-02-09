import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/cart/useCart";

import { withClickOutside } from "@/utils/withClickOutside";

import ProductQuantity from "@/components/modules/Cart/ProductQuantity/ProductQuantity";

import { CiShoppingCart } from "react-icons/ci";

import type { DropdownProps } from "@/utils/withClickOutside";

import styles from "./CartDropdown.module.scss";

const CartDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ opened, toggleDropdown }, ref) => {
    const { items, toggleProduct, amount, incrementProduct, decrementProduct } =
      useCart();

    return (
      <div ref={ref} className={styles["cart-dropdown"]}>
        <button
          onClick={() => toggleDropdown(!opened)}
          className={styles["cart-dropdown-btn"]}
        >
          <CiShoppingCart />
          {items.length > 0 && (
            <span className={styles["count"]}>{items.length}</span>
          )}
        </button>
        {opened && (
          <div className={styles["dropdown-wrapper"]}>
            <div className={`${styles["dropdown"]} theme-bg__inverse`}>
              <h3 className={styles["title"]}>My cart</h3>
              {items.length > 0 &&
                items.map(i => (
                  <div className={styles["dropdown-item"]} key={i.product.id}>
                    <div className={styles["product"]}>
                      <div className={styles["product-image"]}>
                        <Image
                          src={i.product.image ? i.product.image : ""}
                          alt={i.product.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className={styles["product-info"]}>
                        <p className={styles["product-name"]}>
                          {i.product.name}
                        </p>
                        <p className={styles["product-price"]}>
                          ${i.product.price}
                        </p>
                        <div className={styles["product-qyantity"]}>
                          <ProductQuantity
                            quantityValue={i.quantity}
                            incrementHandler={() =>
                              incrementProduct(i.product.id)
                            }
                            decrementHandler={() =>
                              decrementProduct(i.product.id)
                            }
                            deleteHandler={() => toggleProduct(i.product)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className={styles["total"]}>
                <p className={styles["total-title"]}>Total:</p>
                <p className={styles["total-price"]}>${amount}</p>
              </div>
              <Link
                className={`${styles["checkout-link"]} theme-bg`}
                href="/profile/cart"
              >
                Place order
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
);

CartDropdown.displayName = "CartDropdown";

export default withClickOutside(CartDropdown);
