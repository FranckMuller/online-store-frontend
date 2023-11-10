"use client";
import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import * as Api from "@/api";
import type { IEditProductFormData } from "@/app/components/templates/EditProduct/hooks/useEditProduct";
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
  changeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setMainImage: (id: string) => void;
  deleteImage: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
  previewImages: Array<IProductPreviewImage>;
};

const EditProductForm = ({
  formData,
  changeInput,
  changeImage,
  onSubmit,
  previewImages,
  setMainImage,
  deleteImage,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onUploadFile = () => {
    if (fileInputRef?.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={styles["edit-product-form"]}>
      <form className={styles["form"]} onSubmit={onSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Product name:</label>
          <input
            className={styles["form-control"]}
            id="name"
            name="name"
            placeholder="Enter product name"
            onChange={changeInput}
            value={formData.name}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="description">Product description:</label>
          <textarea
            className={styles["form-control"]}
            id="description"
            name="description"
            placeholder="Enter product description"
            onChange={changeInput}
            value={formData.description}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="price">Product price:</label>
          <input
            className={styles["form-control"]}
            id="price"
            name="price"
            placeholder="Enter product price"
            onChange={changeInput}
            value={formData.price}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="description">Product images:</label>
          <input
            ref={fileInputRef}
            style={{ display: "none" }}
            type="file"
            multiple={true}
            className={styles["form-control"]}
            placeholder="Select product images"
            onChange={changeImage}
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
        </div>

        <div className={styles["form-group__checkbox"]}>
          <label htmlFor="published">Publish:</label>
          <input
            className={styles["form-control"]}
            id="published"
            name="published"
            checked={formData.published}
            onChange={() => {}}
            type="checkbox"
          />
        </div>

        <div className={styles["submit-button-wrapper"]}>
          <button className={styles["submit-button"]}>save</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
