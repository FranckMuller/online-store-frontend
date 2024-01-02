"use client";

import {
  useInfiniteQuery,
  
} from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import * as Api from "@/api";

import ProductReview from "../ProductReview/ProductReview";

import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReviews.module.scss";

type Props = {
  productId: string;
};

const ProductReviews = ({ productId }: Props) => {
  const user = useUser();
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["reviews", productId], {
    queryFn: ({ pageParam = 1 }) =>
      Api.reviews.getAllByProduct({ pageParam, productId }),

    getNextPageParam: (lastPage, pages) => {
      return lastPage.offset;
    },
  });

  if (!reviews) return null;

  return (
    <div className={styles["reviews"]}>
      {reviews?.pages ? (
        reviews.pages.map((p) => {
          return p.results.map((r) => (
            <div key={r.id} className={styles["review"]}>
              <ProductReview
                userId={user?.id}
                review={r}
                productId={productId}
              />
            </div>
          ));
        })
      ) : (
        <div>no reviews</div>
      )}

      <div className={styles["load-more-btn"]}>
        <button onClick={() => fetchNextPage()} className="btn-link">
          Load more
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;
