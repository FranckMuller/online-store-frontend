"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import DeleteButton from "./DeleteButton/DeleteButton";

import styles from "./EditControls.module.scss";

type Props = {
  productId: string;
};

const EditControls = ({ productId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const canEdit = pathname.includes("/profile");

  if (!canEdit) return null;

  const onEditClick = () => {
    router.push(`/profile/products/edit/${productId}`);
  };

  return (
    <div className={styles["controls"]}>
      <div className={styles["control"]}>
        <button onClick={() => onEditClick()}>Edit</button>
      </div>
      <div className={styles["control"]}>
        <DeleteButton text="Delete" isIcon={false} productId={productId} />
      </div>
    </div>
  );
};

export default EditControls;