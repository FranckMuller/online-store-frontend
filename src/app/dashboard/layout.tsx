import Link from "next/link";

import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <ul className={styles["nav"]}>
        <li>
          <Link href={"/admin/my-products"}>my products</Link>
        </li>
        <li>
          <Link href={"/admin/create-product"}>create product</Link>
        </li>
      </ul>

      {children}
    </>
  );
};

export default AdminLayout;
