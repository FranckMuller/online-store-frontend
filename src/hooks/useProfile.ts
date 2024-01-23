import { useQuery } from "@tanstack/react-query";
import { useMe } from "@/hooks/useMe";

import type { IAuthResponse } from "@/api/auth";
import type { AxiosError } from "axios";

import * as Api from "@/api";

export const useProfile = () => {
  const { auth } = useMe();

  const { data: profile, isLoading } = useQuery(["profile/me"], {
    queryFn: () => Api.users.getById(auth?.user?.id as string),
    enabled: !!auth?.user?.id
  });

  return profile;
};
