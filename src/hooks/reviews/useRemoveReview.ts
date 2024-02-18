import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import * as Api from "@/api";

export const useRemoveReview = (productId: string) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const { mutate, isLoading } = useMutation({
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
        setError(err.response?.data?.message);
      }
    }
  });

  return {
    remove: mutate,
    isLoading,
    error
  };
};
