"use client";
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEditProduct } from "./hooks/useEditProduct";
import ProductCard from "@/app/components/modules/ProductCard/ProductCard";
import ProductItem from "@/app/components/modules/ProductItem/ProductItem";
import EditProductForm from "@/app/components/modules/EditProductForm/EditProductForm";
import * as Api from "@/api";
import type {
  IProduct,
  IProductImage,
  IProductPreviewImage,
} from "@/interfaces/products.interface";

import styles from "./EditProduct.module.scss";

enum Mode {
  Edit = "edit",
  Preview = "preview",
}


const EditProduct = () => {
  // TODO isolate into hook
  const [mode, setMode] = useState<Mode>(Mode.Edit);

  const {
    formData: productData,
    error,
    isLoading,
    product,
    previewImages,
    handleChangeTextInput,
    handleChangeFileInput,
    handleClickPreviewImage,
    handleClickDeleteImage,
    handleSubmit,
  } = useEditProduct();

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {product && mode === Mode.Preview && <ProductCard product={product} />}
      {product && mode === Mode.Edit && (
        <div className={styles["edit-block"]}>
          <div className={styles["item"]}>
            <ProductItem product={productData} />
            <button className={styles["item-button"]}>card view</button>
          </div>
          <div className={styles["form"]}>
            <EditProductForm
              changeImage={handleChangeFileInput}
              changeInput={handleChangeTextInput}
              onSubmit={handleSubmit}
              formData={productData}
              previewImages={previewImages}
              setMainImage={handleClickPreviewImage}
              deleteImage={handleClickDeleteImage}
            />
          </div>
        </div>
      )}
      {!product && <div>product not found</div>}
    </>
  );
};

export default EditProduct;
