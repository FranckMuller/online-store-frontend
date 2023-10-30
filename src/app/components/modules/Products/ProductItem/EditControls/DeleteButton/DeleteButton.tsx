"use client";
import { useMutation } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { AiFillDelete } from "react-icons/ai";
import * as Api from "@/api";

import styles from "./DeleteButton.module.scss";

type Props = {
  productId: string;
  text?: string;
  isIcon?: boolean;
};

const DeleteButton = ({ productId, text = "", isIcon = true }: Props) => {
  const { mutate: deleteProduct } = useMutation({
    mutationFn: () => Api.products.deleteProduct(productId),
    onSuccess: () => {
      window.location.reload();
      // router.replace(pathname);
      // router.reload();
    },
  });

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteProduct();
  };

  return (
    <button className={styles["delete-button"]} onClick={onClick}>
      <span>{isIcon && <AiFillDelete color={"#e91927"} />}</span>
      <span>{text && text}</span>
    </button>
  );
};

export default DeleteButton;
