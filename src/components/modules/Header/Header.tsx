"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import AuthControls from "./AuthControls/AuthControls";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import ThemeButton from "../ThemeButton/ThemeButton";
import HeaderLogo from "@/components/ui/HeaderLogo/HeaderLogo";
import FavoritesLink from "./FavoritesLink/FavoritesLink";

import styles from "./Header.module.scss";

const Header = () => {
  const { isAuth, user, isAuthChecking } = useAuth();
  return (
    <header className={`${styles["header"]} header`}>
      <div className={styles["logo"]}>
        <Link href="/">
          <HeaderLogo />
        </Link>
      </div>
      <div className={styles["controls"]}>
        <span className={styles['favorites']}><FavoritesLink /></span>
        <ThemeButton className={styles["theme-button"]} />
        {isAuth && user && <ProfileDropdown user={user} />}
        {!isAuth && !isAuthChecking && <AuthControls />}
      </div>
    </header>
  );
};

export default Header;
