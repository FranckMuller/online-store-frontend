import Link from "next/link";
import RootLayout from "@/app/RootLayout";
import Header from '@/components/modules/Header/Header'

import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <RootLayout>
    <Header />
      <section className={styles["admin-layout"]}>
        <div className={styles["nav"]}>
          <ul>
            <li>
              <Link href="/admin">categories</Link>
            </li>
          </ul>
        </div>
        <div className={styles["content"]}>{children}</div>
      </section>
    </RootLayout>
  );
};

export default AdminLayout;
