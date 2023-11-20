"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useEditProduct } from "./hooks/useEditProduct";
import ProductCard from "@/app/components/modules/ProductCard/ProductCard";
import PreviewItem from "./PreviewItem/PreviewItem";
import EditProductForm from "./EditProductForm/EditProductForm";
import PageSpinner from "@/app/components/ui/PageSpinner/PageSpinner";
import type { AxiosError } from "axios";

import styles from "./EditProduct.module.scss";

enum Mode {
  Edit = "edit",
  Preview = "preview",
}

const EditProduct = () => {
  const [mode, setMode] = useState<Mode>(Mode.Edit);

  const {
    formData: productData,
    updateError,
    product,
    previewImages,
    handleChangeTextInput,
    handleChangeFileInput,
    handleClickPreviewImage,
    handleClickDeleteImage,
    handleChangeCheckbox,
    handleSubmit,
    isLoading,
    isNotFoundProduct,
    fieldsErrors,
    handleBlurInput,
    errRef,
    categories,
    handleCategoryClick,
  } = useEditProduct();
console.log(isLoading)
  return (
    <div className={styles["edit-product"]}>
      <PageSpinner isLoading={isLoading} />

      {product && mode === Mode.Preview && <ProductCard product={product} />}

      {product && mode === Mode.Edit && (
        <div className={styles["edit-block"]}>
          <div className={styles["item"]}>
            <PreviewItem product={productData} />
            <button className={styles["item-button"]}>card view</button>
          </div>
          <div className={styles["form"]}>
            <EditProductForm
              changeImage={handleChangeFileInput}
              changeInput={handleChangeTextInput}
              onChangeCheckbox={handleChangeCheckbox}
              onSubmit={handleSubmit}
              formData={productData}
              previewImages={previewImages}
              setMainImage={handleClickPreviewImage}
              deleteImage={handleClickDeleteImage}
              fieldsErrors={fieldsErrors}
              blurInput={handleBlurInput}
              ref={errRef}
              updateError={updateError}
              categories={categories}
              handleCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      )}

      {isNotFoundProduct && <div>product not found</div>}
    </div>
  );
};

export default EditProduct;
