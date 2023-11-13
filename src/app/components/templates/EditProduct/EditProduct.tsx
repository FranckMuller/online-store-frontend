"use client";
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEditProduct } from "./hooks/useEditProduct";
import * as Api from "@/api";
import ProductCard from "@/app/components/modules/ProductCard/ProductCard";
import ProductItem from "@/app/components/modules/ProductItem/ProductItem";
import EditProductForm from "@/app/components/modules/EditProductForm/EditProductForm";
import PageSpinner from "@/app/components/ui/PageSpinner/PageSpinner";
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
  const [mode, setMode] = useState<Mode>(Mode.Edit);

  const {
    formData: productData,
    error,
    product,
    previewImages,
    handleChangeTextInput,
    handleChangeFileInput,
    handleClickPreviewImage,
    handleClickDeleteImage,
    handleSubmit,
    isLoading,
    isNotFoundProduct,
    fieldsErrors,
    handleBlurInput,
  } = useEditProduct();
  
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={styles["edit-product"]}>
      <PageSpinner isLoading={isLoading} />

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
              fieldsErrors={fieldsErrors}
              blurInput={handleBlurInput}
            />
          </div>
        </div>
      )}

      {isNotFoundProduct && <div>product not found</div>}
    </div>
  );
};

export default EditProduct;
