"use client";
import { usePathname } from "next/navigation";
import { BsFillCartPlusFill } from "react-icons/bs";

import styles from "./AddToCartButton.module.scss";

type Props = {
  productId: string;
};

const AddToCartButton = ({ productId }: Props) => {
  const path = usePathname();

  if (path.includes("profile")) return null;

  return (
    <button className={styles["button"]}>
      <BsFillCartPlusFill />
      <span>Add to cart</span>
    </button>
  );
};

export default AddToCartButton;
