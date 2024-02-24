import { useCart } from "@/hooks/cart/useCart";

import { FaTrash } from "react-icons/fa";

import styles from "./ProductQuantity.module.scss";

type Props = {
  quantityValue: number | undefined;
  onChangeQuantity: (value: number | string) => void;
  onDeleteItem: () => void;
};

const ProductQuantity = ({
  quantityValue,
  onDeleteItem,
  onChangeQuantity
}: Props) => {
  return (
    <div className={styles["product-quantity"]}>
      <button
        disabled={(quantityValue && quantityValue < 2) || !quantityValue}
        onClick={() => onChangeQuantity(quantityValue ? +quantityValue - 1 : 0)}
        className={styles["product-count-btn"]}
      >
        -
      </button>
      <input
        onChange={e => {
          onChangeQuantity(e.target.value);
        }}
        type="number"
        value={quantityValue}
      />
      <button
        onClick={() => onChangeQuantity(quantityValue ? +quantityValue + 1 : 1)}
        className={styles["product-count-btn"]}
      >
        +
      </button>
      <button onClick={onDeleteItem} className={styles["remove-product-btn"]}>
        <FaTrash />
      </button>
    </div>
  );
};

export default ProductQuantity;
