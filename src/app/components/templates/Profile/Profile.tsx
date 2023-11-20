"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProfileAvatar } from "@/hooks/useProfileAvatar";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import PageSpinner from "@/app/components/ui/PageSpinner/PageSpinner";
import * as Api from "@/api";
import { useAuth } from "@/hooks/useAuth";

import styles from "./Profile.module.scss";

const Profile = () => {
  const { user, isAuthChecking } = useAuth();
  const { data, isLoading, isSuccess } = useQuery(["profile"], {
    queryFn: () => Api.users.getById(user?.id as string),
    enabled: !!user?.id,
  });

  const loading = isLoading || isAuthChecking;


  return (
    <>
      {data ? (
        <div className={styles["profile"]}>
          <div className={styles["info"]}>
            <ProfileAvatar avatar={data.avatar} />
            <div>
              <div>{data.username}</div>
              <div>{data.email}</div>
            </div>
          </div>
          <div className={`${styles["nav"]} profile-page-menu`}>
            <div className={styles["menu"]}>
              <ProfileMenu />
            </div>
            <button className={styles["logout-btn"]}>Logout</button>
          </div>
        </div>
      ) : (
        <p>user not found</p>
      )}
    </>
  );
};

export default Profile;
