import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import * as Api from "@/api";

import type {
  IProductReview,
  TReviewData
} from "@/interfaces/reviews.interface";

export const useUpdateReview = (productId: string, reviewId: string) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (data: TReviewData) => Api.reviews.update(data, reviewId),
    onSuccess: (review: IProductReview) => {
      queryClient.setQueryData(["reviews", productId], (prev: any) => {
        2;
        const pages = JSON.parse(JSON.stringify(prev.pages));
        for (let i = 0; i < pages.length; i++) {
          for (let j = 0; j < pages[i].results.length; j++) {
            if (pages[i].results[j].id === review.id) {
              pages[i].results[j] = review;
              break;
            }
          }
        }
        queryClient.invalidateQueries([`product/${productId}`]);
        return {
          pageParams: [...prev.pageParams],
          pages: [...pages]
        };
      });
    },
    onError: err => {
      if (err && isAxiosError(err)) {
        setError(err.response?.data?.message);
      }
    }
  });

  return {
    update: mutate,
    isLoading,
    error,
    isSuccess
  };
};
