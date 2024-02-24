"use client";

import { useMe } from "@/hooks/auth/useMe";

import Link from "next/link";

import AuthControls from "./AuthControls/AuthControls";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import ThemeButton from "../ThemeButton/ThemeButton";
import HeaderLogo from "@/components/ui/HeaderLogo/HeaderLogo";
import CartDropdown from "@/components/modules/Cart/CartDropdown/CartDropdown";
import FavoritesLink from "./FavoritesLink/FavoritesLink";

import styles from "./Header.module.scss";

const Header = () => {
  const { user, isAuthed, isAuthChecking } = useMe();

  return (
    <header className={`${styles["header"]} header`}>
      <div className={styles["logo"]}>
        <Link href="/">
          <HeaderLogo />
        </Link>
      </div>
      <div className={styles["controls"]}>
        {isAuthed && (
          <span className={styles["favorites"]}>
            <FavoritesLink />
          </span>
        )}
        {user && <CartDropdown />}
        <ThemeButton className={styles["theme-button"]} />
        {user && <ProfileDropdown user={user} />}
        {!isAuthed && !isAuthChecking && <AuthControls />}
      </div>
    </header>
  );
};

export default Header;
