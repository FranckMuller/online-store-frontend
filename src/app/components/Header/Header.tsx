import Link from "next/link";
import AuthControls from "./AuthControls/AuthControls";

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

          <li>
            <Link href="/profile">profile</Link>
          </li>
        </ul>
      </nav>

      <AuthControls />
    </header>
  );
};

export default Header;
