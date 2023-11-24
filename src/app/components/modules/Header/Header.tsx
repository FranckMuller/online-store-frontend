import Link from "next/link";
import AuthControls from "./AuthControls/AuthControls";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import ThemeButton from "./ThemeButton/ThemeButton";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={`${styles["header"]} header`}>
      <nav className={styles["nav"]}>
        <ul>
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/profile">profile</Link>
          </li>
          <li>
            <Link href="/admin">admin</Link>
          </li>
        </ul>
      </nav>
      <div className={styles["theme-profile"]}>
        <ThemeButton />
        <ProfileDropdown />
      </div>
      <AuthControls />
    </header>
  );
};

export default Header;
