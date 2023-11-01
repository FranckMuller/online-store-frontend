"use client";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/modules/ProductCard/ProductCard";
import ProductItem from "@/app/components/modules/ProductItem/ProductItem";
import EditProductForm from "@/app/components/modules/EditProductForm/EditProductForm";
import * as Api from "@/api";
import type { IProduct } from "@/interfaces/products.interface";

import styles from "./EditProduct.module.scss";

enum Mode {
  Edit = "edit",
  Preview = "preview",
}

const initialData = {
  name: "",
  description: "",
  price: "",
  images: [""],
  id: "",
};

const EditProduct = () => {
  // TODO isolate into hook
  const [mode, setMode] = useState<Mode>(Mode.Edit);
  const [productData, setProductData] = useState(initialData);
  const params = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["get/product"], {
    queryFn: () => Api.products.getById(params.id as string),
    enabled: !!params.id,
  });

  useEffect(() => {
    if (product) {
      const data = {
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        id: product.id,
      };

      setProductData(data);
    }
  }, [product]);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (isLoading) return <div>loading...</div>;

  const handleChangeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const target = e.currentTarget ?? e.target;
    setProductData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

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
              onChangeInput={handleChangeInput}
              product={productData}
            />
          </div>
        </div>
      )}
      {!product && <div>product not found</div>}
    </>
  );
};

export default EditProduct;
