"use client";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import * as Api from "@/api";

import styles from "./AuthControls.module.scss";

const AuthControls = () => {
  const { mutate, isLoading, isSuccess } = useMutation(["auth/logout"], {
    mutationFn: () => Api.auth.signout(),
  });
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isSuccess) redirect("/signin");
  }, [isSuccess]);

  return (
    <div className={styles["auth-controls"]}>
      {isAuth ? (
        <button className={styles["logout"]}>Logout</button>
      ) : (
        <>
          <Link className={styles["registration"]} href={"/signup"}>
            Registration
          </Link>
          <Link className={styles["login"]} href={"/signin"}>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthControls;
