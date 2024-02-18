import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import * as Api from "@/api";

import type { IUpdateReviewData } from "@/api/reviews";
import type { IProductReview } from "@/interfaces/reviews.interface";

// TODO handle errors
export const useReviews = (productId: string) => {
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState(false);
  const [serverError, setServerError] = useState("");

  const { mutate: deleteReview } = useMutation({
    mutationFn: (id: string) => Api.reviews.deleteOne(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData(["reviews", productId], (prev: any) => {
        let pageIdx: number | null = null;
        let reviewIdx: number | null = null;
        const pages = JSON.parse(JSON.stringify(prev.pages));

        for (let i = 0; i < pages.length; i++) {
          for (let j = 0; j < pages[i].results.length; j++) {
            if (pages[i].results[j].id === id) {
              pageIdx = i;
              reviewIdx = j;
              break;
            }
          }
        }

        if (pageIdx !== null && reviewIdx !== null) {
          pages[pageIdx].results.splice(reviewIdx, 1);
        }

        return {
          pageParams: [...prev.pageParams],
          pages: [...pages]
        };
      });

      queryClient.invalidateQueries([`product/${productId}`]);
    },
    onError: err => {
      if (err && isAxiosError(err)) {
        setServerError(err.response?.data?.message);
      }
    }
  });

  const { mutate: updateReview, isLoading: isUpdateLoading } = useMutation({
    mutationFn: (data: IUpdateReviewData) => Api.reviews.update(data),
    onSuccess: (review: IProductReview) => {
      queryClient.setQueryData(["reviews", productId], (prev: any) => {
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
        setIsEditMode(false);
        return {
          pageParams: [...prev.pageParams],
          pages: [...pages]
        };
      });
    },
    onError: err => {
      if (err && isAxiosError(err)) {
        setServerError(err.response?.data?.message);
      }
    }
  });

  return {
    deleteReview,
    updateReview,
    isUpdateLoading,
    isEditMode,
    setIsEditMode,
    serverError,
    setServerError
  };
};
