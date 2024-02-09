import { useCart } from "@/hooks/cart/useCart";

import { FaTrash } from "react-icons/fa";

import styles from "./ProductQuantity.module.scss";

type Props = {
  quantityValue: number;
  incrementHandler: () => void;
  decrementHandler: () => void;
  deleteHandler: () => void;
};

const ProductQuantity = ({
  quantityValue,
  incrementHandler,
  decrementHandler,
  deleteHandler
}: Props) => {
  return (
    <div className={styles["product-quantity"]}>
      <button
        onClick={decrementHandler}
        className={styles["product-count-btn"]}
      >
        -
      </button>
      <input onChange={() => {}} type="number" value={quantityValue} />
      <button
        onClick={incrementHandler}
        className={styles["product-count-btn"]}
      >
        +
      </button>
      <button onClick={deleteHandler} className={styles["remove-product-btn"]}>
        <FaTrash />
      </button>
    </div>
  );
};

export default ProductQuantity;
