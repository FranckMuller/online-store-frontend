"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import * as Api from "@/api";

import ProductReview from "../ProductReview/ProductReview";

import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReviews.module.scss";

type Props = {
  productId: string;
};

const ProductReviews = ({ productId }: Props) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const { data: reviews, isLoading } = useQuery(["reviews", productId], {
    queryFn: () => Api.reviews.getAllByProduct(productId),
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: (id: string) => Api.reviews.deleteOne(id),
    onSuccess: ({ id }) => {
      queryClient.setQueryData(["reviews", productId], (prev: any) => {
        return prev.filter((e: IProductReview) => e.id !== id);
      });
    },
  });

  if (!reviews) return null;

  return (
    <div className={styles["reviews"]}>
      {reviews.map((r) => (
        <div key={r.id} className={styles["review"]}>
          <ProductReview
            deleteReview={deleteReview}
            userId={user?.id}
            review={r}
          />
        </div>
      ))}

      <div className={styles["load-more-btn"]}>
        <button className="btn-link">Load more</button>
      </div>
    </div>
  );
};

export default ProductReviews;
