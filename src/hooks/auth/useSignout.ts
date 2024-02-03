import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Api from "@/api";

export const useSignout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: signout,
    isLoading,
    isSuccess
  } = useMutation({
    mutationFn: (userId: string) => Api.auth.signout(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth/check"] });
      router.replace("/signin");
    }
  });

  return { signout };
};
