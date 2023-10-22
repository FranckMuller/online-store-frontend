import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { selectUser } from "@/store/auth/auth.selectors";
import { setCredentials } from "@/store/auth/auth.slice";

// let counter = 0;

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [shouldRender, setShouldRender] = useState(false);
  const shouldCheckAuth = useRef(true);

  const { data, isError, isSuccess, isFetching, error, isLoading } = useQuery(
    ["auth/check"],
    {
      queryFn: () => Api.auth.checkAuth(),
      select: (data) => data.user,
      enabled: shouldCheckAuth.current,
      retry: false,
      keepPreviousData: true,
      // staleTime: 600000,
    }
  );
  let isAuth;
  let isAuthChecking;

  if (user) {
    isAuth = true;
    isAuthChecking = false;
  }

  if (isLoading) {
    isAuthChecking = true;
  }

  if (!user && !isLoading) {
    isAuth = false;
  }

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(setCredentials(null));
    }
    if (isSuccess) {
      dispatch(setCredentials(data));
    }
  }, [isSuccess, isError, dispatch]);

  // return { isAuth, isAuthChecking, user };
  return { user, isAuth, isAuthChecking, isLoading };
};
