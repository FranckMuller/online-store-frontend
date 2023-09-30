"use client";
import ProductForm from "@/app/components/ProductForm/ProductForm";

import styles from "./page.module.scss";

const CreateProductPage = () => {
  return (
    <>
      <h3 className={styles["heading"]}>Create your product</h3>
      <ProductForm />
    </>
  );
};

export default CreateProductPage;
