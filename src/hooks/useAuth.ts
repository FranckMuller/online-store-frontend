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
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [shouldRender, setShouldRender] = useState(false);
  const shouldCheckAuth = useRef(true);
  const { data, isError, isSuccess, isFetching, error, isLoading } = useQuery<
    IAuthResponse,
    AxiosError<ErrorResponse>
  >(["auth/check"], {
    queryFn: () => Api.auth.checkAuth(),
    // enabled: shouldCheckAuth.current,
    retry: false,
    keepPreviousData: true,
    // staleTime: 600000,
  });


  useEffect(() => {
    dispatch(setCredentials(user));
  }, [data, dispatch]);
  
  let isAuthChecking = false;
  let isAuth = false;
  if (!user && isLoading) isAuthChecking = true;
  if (user) isAuth = true;

  return { user: data?.user, isAuth, isAuthChecking, error };
};
