"use client";
import { usePathname } from "next/navigation";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

import styles from "./AddToCartButton.module.scss";

type Props = {
  productId: string;
  toggleProductCart?: () => void;
  isInCart?: boolean;
};

const AddToCartButton = ({
  productId,
  isInCart = false,
  toggleProductCart
}: Props) => {
  const path = usePathname();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (toggleProductCart) {
      toggleProductCart();
    }
  };

  if (path.includes("profile")) return null;

  return (
    <button className={styles["button"]} onClick={handleClick}>
      {isInCart ? <IoCartSharp /> : <IoCartOutline />}
    </button>
  );
};

export default AddToCartButton;
