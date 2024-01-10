"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useProfileAvatar } from "@/hooks/useProfileAvatar";
import { useAuth } from "@/hooks/useAuth";
import { handleAxiosError } from "@/utils/errors.utils";

import ProfileAvatar from "@/components/modules/Profile/ProfileAvatar/ProfileAvatar";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";
import UploadProfileAvatar from "@/components/modules/Profile/UploadProfileAvatar/UploadProfileAvatar";
import ProfileInfo from "@/components/modules/Profile/ProfileInfo/ProfileInfo";

import * as Api from "@/api";

import type { AxiosError } from "axios";

import styles from "./Profile.module.scss";

const Profile = () => {
  const [serverError, setServerError] = useState("");
  const { user, isAuthChecking, authError } = useAuth();

  const {
    data,
    isLoading,
    isSuccess,
    error: queryUserError,
  } = useQuery(["profile"], {
    queryFn: () => {
      if (user?.id) {
        return Api.users.getById(user.id);
      }
    },
    onError: (err) => {
      const error = handleAxiosError(err)
        setServerError(error);
      
    },
    enabled: !!user?.id,
  });

  const error = serverError || authError || "";
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
      {error && <div>{error}</div>}
    </>
  );
};

export default Profile;
