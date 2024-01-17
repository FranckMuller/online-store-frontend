"use client";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/modules/Products/ProductCard/ProductCard";
import ProductReviews from "@/components/modules/Reviews/ProductReviews/ProductReviews";
import ReviewForm from "@/components/modules/Reviews/ReviewForm/ReviewForm";

import * as Api from "@/api";

import type { IProduct } from "@/interfaces/products.interface";

import styles from "./BrowseProduct.module.scss";

type Props = {
  initialProduct: IProduct;
  productId: string;
};

const BrowseProduct = ({ initialProduct, productId }: Props) => {
  const { data: product } = useQuery([`product/${productId}`], {
    queryFn: () => Api.products.getById(productId),
    initialData: initialProduct
  });

  return (
    <div className={styles["browse-product"]}>
      <ProductCard product={product} />
      <div id="reviews" className={styles["reviews"]}>
        {product.reviews && <ProductReviews productId={product.id} />}
      </div>

      <div className={styles["form"]}>
        <ReviewForm productId={product.id} />
      </div>
    </div>
  );
};

export default BrowseProduct;
