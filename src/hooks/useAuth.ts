import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { selectUser } from "@/store/auth/auth.selectors";
import { setCredentials } from "@/store/auth/auth.slice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [shouldRender, setShouldRender] = useState(false);
  const shouldCheckAuth = useRef(true);

  const { data, isError, isSuccess, isFetching } = useQuery(["auth/check"], {
    queryFn: () => Api.auth.checkAuth(),
    enabled: shouldCheckAuth.current,
    retry: false,
    staleTime: 600000,
  });

  let isAuth;
  let isAuthChecking;

  if (user) {
    isAuth = true;
    isAuthChecking = false;
  }

  if (!user && isFetching) {
    isAuthChecking = true;
  }

  if (isError) {
    isAuthChecking = false;
    isAuth = false;
  }

  if (!user && isSuccess) {
    isAuth = false;
    isAuthChecking = false;
  }

  console.log("useAuth");

  useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false;
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(setCredentials(null));
    }
    if (isSuccess && !user) {
      dispatch(setCredentials(data.user));
    }
  }, [isSuccess, isError, dispatch]);

  return { isAuth, isAuthChecking, user };
};
