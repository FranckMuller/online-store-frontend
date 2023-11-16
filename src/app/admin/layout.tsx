import Link from "next/link";

import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <section>
      <div className={styles["nav"]}>
        <ul>
          <li>
            <Link href="/">categories</Link>
          </li>
          
        </ul>
      </div>
      {children}
    </section>
  );
};

export default AdminLayout;
