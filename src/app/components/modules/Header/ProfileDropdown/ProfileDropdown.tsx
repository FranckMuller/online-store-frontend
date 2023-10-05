"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUser } from "@/store/auth/auth.selectors";
import * as Api from "@/api";
import { FaUserCircle } from "react-icons/fa";

import styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = () => {
  const user = useAppSelector(selectUser);

  const {
    mutate: logout,
    isLoading,
    isSuccess,
  } = useMutation(["auth/logout"], {
    mutationFn: () => Api.auth.signout(),
  });

  useEffect(() => {
    if (isSuccess) redirect("/signin");
  }, [isSuccess]);

  if (!user) return null;

  return (
    <div className={styles["drop-down"]}>
      <div className={styles['avatar']}>
        <FaUserCircle />
      </div>
      <div className={styles["profile"]}>{user.username}</div>
      <button onClick={() => logout()} className={styles["logout"]}>
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
