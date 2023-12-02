"use client";
import { ChangeEvent, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import * as Api from "@/api";

import styles from "./ProductForm.module.scss";

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  images: FileList | null;
};

const initialData = {
  name: "",
  description: "",
  price: "",
  images: null,
};

const ProductForm = () => {
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

  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [published, setPublished] = useState(true);
  const [images, setImages] = useState<FileList | null>(null);

  const onChangeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.currentTarget ?? e.target;
    console.log(target);
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const onChangePublished = () => {
    setPublished((prev) => !prev);
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, price } = formData;
    const isValid = images && name && description && price;
    console.log(formData);
    let data = new FormData();
    if (isValid) {
      try {
        // check if toString work
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("published", published.toString());
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
    setFormData(initialData);
    setImages(null);
  }, [isSuccess]);

  return (
    <div className={styles["product-form"]}>
      <form className={styles["form"]} onSubmit={onSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Product name:</label>
          <input
            className={styles["form-control"]}
            id="name"
            name="name"
            placeholder="Enter product name"
            onChange={onChangeInput}
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
            onChange={onChangeInput}
            value={formData.description}
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
            value={formData.price}
          />
        </div>

        <div className={styles["form-group__checkbox"]}>
          <label htmlFor="published">Publish:</label>
          <input
            className={styles["form-control"]}
            id="published"
            name="published"
            checked={published}
            onChange={onChangePublished}
            type="checkbox"
          />
        </div>
        <div className={styles["submit-button-wrapper"]}>
          <button className={styles["submit-button"]}>create product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
