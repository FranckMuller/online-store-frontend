import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/cart/useCart";

import { withClickOutside } from "@/utils/withClickOutside";
import type { DropdownProps } from "@/utils/withClickOutside";

import { CiShoppingCart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

import styles from "./CartDropdown.module.scss";

const CartDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ opened, toggleDropdown }, ref) => {
    const {
      items,
      toggleProduct,
      amount,
      incrementProduct,
      decrementProduct,
    } = useCart();

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
                        <div className={styles["product-count"]}>
                          <button
                            onClick={e => decrementProduct(i.product.id)}
                            className={styles["product-count-btn"]}
                          >
                            -
                          </button>
                          <input
                            onChange={() => {}}
                            type="number"
                            value={i.quantity}
                          />
                          <button
                            onClick={e => incrementProduct(i.product.id)}
                            className={styles["product-count-btn"]}
                          >
                            +
                          </button>
                          <button
                            onClick={e => toggleProduct(i.product)}
                            className={styles["remove-product-btn"]}
                          >
                            <FaTrash />
                          </button>
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
                href="/cart"
              >
                Go to checkout
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
