"use client";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

import AuthControls from "./AuthControls/AuthControls";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";
import ThemeButton from "./ThemeButton/ThemeButton";
import HeaderLogo from '@/components/ui/HeaderLogo/HeaderLogo'

import styles from "./Header.module.scss";

const Header = () => {
  const { isAuth, user, isAuthChecking } = useAuth();
  return (
    <header className={`${styles["header"]} header`}>
      <div className={styles["logo"]}>
        <HeaderLogo />
      </div>
      <div className={styles["theme-profile"]}>
        <ThemeButton />
        {isAuth && user && <ProfileDropdown user={user} />}
        {!isAuth && !isAuthChecking && <AuthControls />}
      </div>
    </header>
  );
};

export default Header;
