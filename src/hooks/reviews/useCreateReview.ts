import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import * as Api from "@/api";
import type { TReviewData } from "@/interfaces/reviews.interface";

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (data: TReviewData) =>
      Api.reviews.create(data, productId),
    onSuccess: data => {
      queryClient.setQueryData(["reviews", productId], (prev: any) => {
        queryClient.invalidateQueries([`product/${productId}`]);
        return {
          pages: [{ results: [data] }, ...prev.pages],
          pageParams: [...prev.pageParams]
        };
        // return prev ? [data, ...prev] : [data];
      });
    },
    onError: err => {
      if (err && isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
    }
  });

  return {
    create: mutate,
    isLoading,
    isSuccess,
    error
  };
};
