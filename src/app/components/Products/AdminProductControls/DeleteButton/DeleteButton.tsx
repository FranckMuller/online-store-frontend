"use client";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { AiFillDelete } from "react-icons/ai";
import * as Api from "@/api";

import styles from './DeleteButton.module.scss'

type Props = {
  productId: string;
  text?: string;
  isIcon?: boolean;
};

const DeleteButton = ({ productId, text = "", isIcon = true }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { mutate: deleteProduct } = useMutation({
    mutationFn: () => Api.products.deleteProduct(productId),
    onSuccess: () => {
      window.location.reload();
      // router.replace(pathname);
      // router.reload();
    },
  });
  const isAdminPanel = pathname.includes("/admin");
  console.log(pathname);
  if (!isAdminPanel) return null;

  return (
    <button className={styles["delete-button"]} onClick={() => deleteProduct()}>
      <span>{isIcon && <AiFillDelete color={"#e91927"} />}</span>
      <span>{text && text}</span>
    </button>
  );
};

export default DeleteButton;
