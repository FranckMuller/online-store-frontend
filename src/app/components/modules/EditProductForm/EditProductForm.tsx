"use client";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import * as Api from "@/api";
import type { IProduct } from "@/interfaces/products.interface";

import styles from "./EditProductForm.module.scss";

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  images: string[];
  id: string;
};

type Props = {
  product: IProduct;
  onChangeInput: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const EditProductForm = ({ product, onChangeInput }: Props) => {
  const {
    mutate: createProduct,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (productData: FormData) => Api.products.create(productData),
  });

  const [images, setImages] = useState<FileList | null>(null);

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, price } = product;
    const isValid = images && name && description && price;
    let data = new FormData();
    if (isValid) {
      try {
        data.append("name", product.name);
        data.append("description", product.description);
        data.append("price", product.price);
        for (let i = 0; i < images.length; i++) {
          data.append("images", images[i]);
        }

        createProduct(data);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    setImages(null);
  }, [isSuccess]);

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
            onChange={onChangeInput}
            value={product.name}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="description">Product description:</label>
          <textarea
            className={styles["form-control"]}
            id="description"
            name="description"
            placeholder="Enter product description"
            onChange={onChangeInput}
            value={product.description}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="description">Product images:</label>
          <input
            type="file"
            multiple={true}
            className={styles["form-control"]}
            placeholder="Select product images"
            onChange={onChangeImage}
          />
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="price">Product price:</label>
          <input
            className={styles["form-control"]}
            id="price"
            name="price"
            placeholder="Enter product price"
            onChange={onChangeInput}
            value={product.price}
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
