import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/hooks/cart/useCart";

import { CiShoppingCart } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

import styles from "./CartDropdown.module.scss";

const CartDropdown = () => {
  const { products, toggleProduct } = useCart();

  return (
    <div className={styles["cart-dropdown"]}>
      <button className={styles["cart-dropdown-btn"]}>
        <CiShoppingCart />
      </button>
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
                    <button className={styles["product-count-btn"]}>-</button>
                    <input type="number" value={p.count ? p.count : 1} />
                    <button className={styles["product-count-btn"]}>+</button>
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
          <p className={styles["total-price"]}>$20000</p>
        </div>
        <Link
          className={`${styles["checkout-link"]} theme-bg`}
          href="/checkout"
        >
          Go to checkout
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
