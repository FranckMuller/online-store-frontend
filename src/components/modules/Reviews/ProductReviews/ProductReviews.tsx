"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

import {useMe} from "@/hooks/auth/useMe";

import * as Api from "@/api";

import ProductReview from "../ProductReview/ProductReview";
import ElementSpinner from "@/components/ui/ElementSpinner/ElementSpinner";

import type { IProductReview } from "@/interfaces/reviews.interface";

import styles from "./ProductReviews.module.scss";

type Props = {
  productId: string;
};

const ProductReviews = ({ productId }: Props) => {
  const {user} = useMe();
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["reviews", productId], {
    queryFn: ({ pageParam = 0 }) =>
      Api.reviews.getAllByProduct({ offset: pageParam, productId }),

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

      {hasNextPage && (
        <div className={styles["load-more-btn"]}>
          {isFetchingNextPage && <ElementSpinner isLoading={isFetchingNextPage} />}
          <button
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="btn-link"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
