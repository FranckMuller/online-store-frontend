import { useQuery } from "@tanstack/react-query";
import * as Api from "@/api";

export const useMe = () => {
  const { data: auth } = useQuery(["auth"], {
    queryFn: () => Api.auth.checkAuth()
  });

  const isAuthed = auth ? true : false
  return { auth, isAuthed };
};
