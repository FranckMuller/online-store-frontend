"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AddProductModal from "./AddProductModal/AddProductModal";
import ProductsList from "@/app/components/modules/ProductsList/ProductsList";
import * as Api from "@/api";

import styles from "./MyProducts.module.scss";
// TODO confirm delete product
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

  const toggleAddProductModal = () => {
    setIsShowedModal((prev) => !prev);
  };

  return (
    <div className={styles["my-products"]}>
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

      <button onClick={toggleAddProductModal} className={`${styles["add-button"]} btn-primary`}>
        Add product
      </button>
    </div>
  );
};

export default MyProducts;
