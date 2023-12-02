"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useProfileAvatar } from "@/hooks/useProfileAvatar";
import { useAuth } from "@/hooks/useAuth";

import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

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
          <ProfileAvatar avatar={data.avatar} />
          <div>
            <div>{data.username}</div>
            <div>{data.email}</div>
          </div>
        </div>
      )}
      {error && error.response && <div>{error.response.data.message}</div>}
    </>
  );
};

export default Profile;
