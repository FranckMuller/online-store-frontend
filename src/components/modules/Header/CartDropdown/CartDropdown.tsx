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
      products,
      toggleProduct,
      totalPrice,
      incrementProduct,
      decrementProduct
    } = useCart();

    return (
      <div ref={ref} className={styles["cart-dropdown"]}>
        <button
          onClick={() => toggleDropdown(!opened)}
          className={styles["cart-dropdown-btn"]}
        >
          <CiShoppingCart />
        </button>
        {opened && (
          <div className={styles["dropdown-wrapper"]}>
            <div className={`${styles["dropdown"]} theme-bg__inverse`}>
              <h3 className={styles["title"]}>My cart</h3>
              {products.length > 0 &&
                products.map(p => (
                  <div className={styles["dropdown-item"]} key={p.id}>
                    <div className={styles["product"]}>
                      <div className={styles["product-image"]}>
                        <Image
                          src={p.image ? p.image : ""}
                          alt={p.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className={styles["product-info"]}>
                        <p className={styles["product-name"]}>{p.name}</p>
                        <p className={styles["product-price"]}>${p.price}</p>
                        <div className={styles["product-count"]}>
                          <button
                            onClick={e => decrementProduct(p.id)}
                            className={styles["product-count-btn"]}
                          >
                            -
                          </button>
                          <input type="number" value={p.count} />
                          <button
                            onClick={e => incrementProduct(p.id)}
                            className={styles["product-count-btn"]}
                          >
                            +
                          </button>
                          <button
                            onClick={e => toggleProduct(p)}
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
                <p className={styles["total-price"]}>${totalPrice}</p>
              </div>
              <Link
                className={`${styles["checkout-link"]} theme-bg`}
                href="/checkout"
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
