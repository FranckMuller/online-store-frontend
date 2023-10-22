"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectUser } from "@/store/auth/auth.selectors";
import * as Api from "@/api";

import AvatarMini from "../AvatarMini/AvatarMini";
import { FaUserCircle } from "react-icons/fa";

import styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = () => {
  const user = useAppSelector(selectUser);

  const { mutate, isLoading, isSuccess } = useMutation(["auth/logout"], {
    mutationFn: (userId: string) => Api.auth.signout(userId),
  });

  useEffect(() => {
    if (isSuccess) redirect("/signin");
  }, [isSuccess]);

  if (!user) return null;

  const logout = () => {
    mutate(user.id);
  };

  return (
    <div className={styles["profile-dropdown"]}>
      <div className={styles["avatar"]}>
        <AvatarMini avatar={user.avatarMini} />
      </div>
      <div className={styles['dropdown']}>
      <div className={styles["credentials"]}>
        <div className={styles["username"]}>{user.username}</div>
        <div className={styles["email"]}>{user.email}</div>
      </div>
      <button onClick={logout} className={styles["logout"]}>
        Logout
      </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
