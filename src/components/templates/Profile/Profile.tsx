"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useProfileAvatar } from "@/hooks/useProfileAvatar";
import { useAuth } from "@/hooks/useAuth";

import ProfileAvatar from "@/components/modules/Profile/ProfileAvatar/ProfileAvatar";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";
import UploadProfileAvatar from "@/components/modules/Profile/UploadProfileAvatar/UploadProfileAvatar";
import ProfileInfo from "@/components/modules/Profile/ProfileInfo/ProfileInfo";

import * as Api from "@/api";

import type { AxiosError } from "axios";

import styles from "./Profile.module.scss";

const Profile = () => {
  const { user, isAuthChecking, error: checkAuthError } = useAuth();
  const {
    data,
    isLoading,
    isSuccess,
    error: queryUserError,
  } = useQuery<IFullestUser, AxiosError<ErrorResponse>>(["profile"], {
    queryFn: () => Api.users.getById(user?.id as string),
    enabled: !!user?.id,
  });

  const error = queryUserError || checkAuthError || "";
  const loading = isAuthChecking && isLoading && !user?.id;
  if (loading) return <PageSpinner isLoading={loading} />;

  return (
    <>
      {data && (
        <div className={styles["profile"]}>
          <div className={styles["avatar-wrapper"]}>
            <div className={styles["avatar"]}>
              <ProfileAvatar avatar={data.avatar} />
            </div>
            <div className={styles["upload-avatar"]}>
              <UploadProfileAvatar />
            </div>
          </div>
          <div className={styles["details"]}>
            <ProfileInfo profile={data} />
          </div>
        </div>
      )}
      {error && error.response && <div>{error.response.data.message}</div>}
    </>
  );
};

export default Profile;
