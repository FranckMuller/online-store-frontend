import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../useAppDispatch";
import * as Api from "@/api";

export const useCreateOrder = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate, isLoading } = useMutation({
    mutationFn: Api.orders.createOrder,
     onSuccess(data) {
       router.push("/profile/checkout");
    }
  });

  return {
    create: mutate,
    isLoading
  };
};
