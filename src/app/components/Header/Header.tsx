import Link from "next/link";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles["header"]}>
      <nav className={styles["nav"]}>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/admin">admin panel</Link>
          </li>
        </ul>
      </nav>

      <div className={styles["auth-controls"]}>
        <Link href={"/signup"}>Registration</Link>
        <Link href={"/signin"}>Login</Link>
      </div>
    </header>
  );
};

export default Header;
