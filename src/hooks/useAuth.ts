import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Api from "@/api";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { selectUser } from "@/store/auth/auth.selectors";
import { setCredentials } from "@/store/auth/auth.slice";
import type { IAuthResponse } from "@/api/auth";
import type { AxiosError } from "axios";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const shouldCheckAuth = useRef(true);
  const { data, isError, isSuccess, isFetching, error, isLoading } = useQuery<
    IAuthResponse,
    AxiosError<ErrorResponse>
  >(["auth/check"], {
    queryFn: () => Api.auth.checkAuth(),
    retry: false,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (data && !user) {
      dispatch(setCredentials(data.user));
    }
  }, [data, dispatch, user]);

  useEffect(() => {
    if (error) {
      dispatch(setCredentials(null));
    }
  }, [error, dispatch]);

  let isAuth = false;
  if (user && !error) isAuth = true;

  return { user, isAuth, isAuthChecking: isLoading, error };
};
