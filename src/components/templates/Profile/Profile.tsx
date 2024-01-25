"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useProfile } from "@/hooks/useProfile";
import { handleAxiosError } from "@/utils/errors.utils";

import ProfileAvatar from "@/components/modules/Profile/ProfileAvatar/ProfileAvatar";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";
import UploadProfileAvatar from "@/components/modules/Profile/UploadProfileAvatar/UploadProfileAvatar";
import ProfileInfo from "@/components/modules/Profile/ProfileInfo/ProfileInfo";

import * as Api from "@/api";

import type { AxiosError } from "axios";

import styles from "./Profile.module.scss";

const Profile = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading) return <PageSpinner isLoading={isLoading} />;

  return (
    <>
      {profile && (
        <div className={styles["profile"]}>
          <div className={styles["avatar-wrapper"]}>
            <div className={styles["avatar"]}>
              <ProfileAvatar avatar={profile.avatar} />
            </div>
            <div className={styles["upload-avatar"]}>
              <UploadProfileAvatar />
            </div>
          </div>
          <div className={styles["details"]}>
            <ProfileInfo profile={profile} />
          </div>
        </div>
      )}
      {error && <div>{error}</div>}
    </>
  );
};

export default Profile;
