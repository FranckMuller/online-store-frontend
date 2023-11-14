"use client";
import { useState, useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import * as Api from "@/api";
import type {
  IEditProductFormData,
  FieldsErrors,
} from "@/app/components/templates/EditProduct/hooks/useEditProduct";
import type {
  IProduct,
  IProductImage,
  IProductPreviewImage,
} from "@/interfaces/products.interface";
import PreviewImages from "./PreviewImages/PreviewImages";

import styles from "./EditProductForm.module.scss";

type Props = {
  formData: IEditProductFormData;
  changeInput: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  changeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setMainImage: (id: string) => void;
  deleteImage: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  previewImages: Array<IProductPreviewImage>;
  fieldsErrors: FieldsErrors;
  blurInput: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  updateError: string;
};

const EditProductForm = forwardRef<HTMLDivElement, Props>(
  (
    {
      formData,
      changeInput,
      changeImage,
      onSubmit,
      previewImages,
      setMainImage,
      deleteImage,
      fieldsErrors,
      blurInput,
      onChangeCheckbox,
      updateError,
    },
    errRef
  ) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onUploadFile = () => {
      if (fileInputRef?.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <div className={styles["edit-product-form"]}>
        <form className={styles["form"]} onSubmit={onSubmit}>
          <div
            className={`${styles["form-group"]} ${
              fieldsErrors.name && styles["error"]
            }`}
          >
            <label htmlFor="name">Product name:</label>
            <input
              className={styles["form-control"]}
              id="name"
              name="name"
              placeholder="Enter product name"
              onChange={changeInput}
              value={formData.name}
              onBlur={blurInput}
            />

            {fieldsErrors.name && (
              <span className={styles["error-msg"]}>{fieldsErrors.name}</span>
            )}
          </div>

          <div
            className={`${styles["form-group"]} ${
              fieldsErrors.description && styles["error"]
            }`}
          >
            <label htmlFor="description">Product description:</label>
            <textarea
              className={styles["form-control"]}
              id="description"
              name="description"
              placeholder="Enter product description"
              onChange={changeInput}
              value={formData.description}
              onBlur={blurInput}
            />

            {fieldsErrors.description && (
              <span className={styles["error-msg"]}>
                {fieldsErrors.description}
              </span>
            )}
          </div>

          <div
            className={`${styles["form-group"]} ${
              fieldsErrors.price && styles["error"]
            }`}
          >
            <label htmlFor="price">Product price:</label>
            <input
              className={styles["form-control"]}
              id="price"
              name="price"
              placeholder="Enter product price"
              onChange={changeInput}
              value={formData.price}
              type="number"
              onBlur={blurInput}
            />

            {fieldsErrors.price && (
              <span className={styles["error-msg"]}>{fieldsErrors.price}</span>
            )}
          </div>

          <div
            className={`${styles["form-group"]} ${
              fieldsErrors.images && styles["error"]
            }`}
          >
            <label htmlFor="description">Product images:</label>
            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
              multiple={true}
              className={styles["form-control"]}
              placeholder="Select product images"
              onChange={changeImage}
              name="images"
            />

            <PreviewImages
              deleteImage={deleteImage}
              setMainImage={setMainImage}
              images={previewImages}
            />

            <div>
              <button
                type="button"
                onClick={onUploadFile}
                className={styles["upload-button"]}
              >
                Choose images
              </button>
            </div>

            {fieldsErrors.images && (
              <span className={styles["error-msg"]}>{fieldsErrors.images}</span>
            )}
          </div>

          <div className={styles["form-group__checkbox"]}>
            <label htmlFor="published">Publish:</label>
            <input
              className={styles["form-control"]}
              id="published"
              name="published"
              checked={formData.published}
              onChange={onChangeCheckbox}
              type="checkbox"
            />
          </div>

          <div className={styles["submit-button-wrapper"]}>
            {updateError && (
              <span className={styles["error"]} ref={errRef}>
                {updateError}
              </span>
            )}
            <button className={styles["submit-button"]}>save</button>
          </div>
        </form>
      </div>
    );
  }
);

export default EditProductForm;
