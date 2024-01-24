import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";

export const useMe = () => {
  const { data: auth, isLoading: isAuthChecking } = useQuery(["auth/check"], {
    queryFn: () => Api.auth.checkAuth(),
    keepPreviousData: true
  });

  const user = auth ? auth.user : null;
  const isAuthed = auth ? true : false;

  return { user, isAuthed, isAuthChecking };
};
