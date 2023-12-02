"use client";
import { usePathname } from "next/navigation";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoCartOutline, IoCartSharp } from "react-icons/io5"

import styles from "./AddToCartButton.module.scss";

type Props = {
  productId: string;
  isEmpty?: boolean
};

const AddToCartButton = ({ productId, isEmpty = true }: Props) => {
  const path = usePathname();

  if (path.includes("profile")) return null;

  return (
    <button className={styles["button"]}>
      {isEmpty ? <IoCartOutline /> : <IoCartSharp />}
    </button>
  );
};

export default AddToCartButton;
