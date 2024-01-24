import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMe } from "@/hooks/useMe";

import { isAxiosError } from "axios";

import * as Api from "@/api";

export const useProfile = () => {
  const { user } = useMe();
  const [error, setError] = useState("");
  const { data: profile, isLoading } = useQuery(["profile/me"], {
    queryFn: () => Api.users.getById(user?.id as string),
    onError: error => {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      }
    },
    enabled: !!user?.id
  });

  return { profile, isLoading, error };
};
