"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddProductModal from "./AddProductModal/AddProductModal";
import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";
import { useAuth } from "@/hooks/useAuth";
import * as Api from "@/api";
import type { IProducts } from "@/interfaces/products.interface";
import type { AxiosError } from "axios";

import styles from "./MyProducts.module.scss";
// TODO confirm delete product
const MyProducts = () => {
  const { isAuth } = useAuth();
  const [isShowedModal, setIsShowedModal] = useState(false);
  const {
    data: products,
    isLoading,
    error
  } = useQuery<IProducts, AxiosError<ErrorResponse>>(["get/my-products"], {
    queryFn: () => Api.products.getMyProducts(),
    enabled: isAuth
  });

  if (isLoading) return <PageSpinner isLoading />;

  const toggleAddProductModal = () => {
    setIsShowedModal(prev => !prev);
    document.body.classList.toggle("no-scroll");
  };

  return (
    <div className={styles["my-products"]}>
      {products?.length ? (
        <ProductsList products={products} />
      ) : (
        <div>You have no products, you should add your products</div>
      )}
      {isShowedModal && (
        <AddProductModal
          showed={isShowedModal}
          toggleModal={toggleAddProductModal}
        />
      )}

      {error && error.response && <div>{error.response.data.message}</div>}

      <button
        onClick={toggleAddProductModal}
        className={`${styles["add-button"]} btn-primary`}
      >
        Add product
      </button>
    </div>
  );
};

export default MyProducts;
