"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

import styles from "./AuthControls.module.scss";

const AuthControls = () => {
  const { isAuth, isAuthChecking } = useAuth();

  if (isAuthChecking || isAuth) return null;

  return (
    <div className={styles["auth-controls"]}>
      <Link className={styles["registration"]} href={"/signup"}>
        Registration
      </Link>
      <Link className={styles["login"]} href={"/signin"}>
        Login
      </Link>
    </div>
  );
};

export default AuthControls;
