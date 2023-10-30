"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddProductModal from "./AddProductModal/AddProductModal";
import ProductsList from "@/app/components/modules/Products/ProductsList/ProductsList";
import * as Api from "@/api";

import styles from "./MyProducts.module.scss";

const MyProducts = () => {
  const [isShowedModal, setIsShowedModal] = useState(false);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["get/my-products"], {
    queryFn: () => Api.products.getMyProducts(),
  });

  if (isLoading) return <div>loading products...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  const addProduct = () => {};
  const toggleAddProductModal = () => {
    setIsShowedModal((prev) => !prev);
  };

  return (
    <>
      {products?.length ? (
        <ProductsList products={products} />
      ) : (
        <div>products not found</div>
      )}

      {isShowedModal && (
        <AddProductModal
          showed={isShowedModal}
          toggleModal={toggleAddProductModal}
        />
      )}

      <button onClick={toggleAddProductModal} className={styles["add-button"]}>
        Add product
      </button>
    </>
  );
};

export default MyProducts;