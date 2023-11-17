import Link from "next/link";

import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <section className={styles["admin-layout"]}>
      <div className={styles["nav"]}>
        <ul>
          <li>
            <Link href="/admin">categories</Link>
          </li>
        </ul>
      </div>
      <div className={styles['content']}>
      {children}
      </div>
    </section>
  );
};

export default AdminLayout;
