import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";

export const useAuth = () => {
  const { data } = useQuery(["auth/check"], {
    queryFn: () => Api.auth.checkAuth(),
  });

  return { isAuth: true };
};
