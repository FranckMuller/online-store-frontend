"use client";
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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

const initialData = {
  name: "",
  description: "",
  price: "",
  images: [{ id: "", filename: "", path: "" }],
  id: "",
  published: false,
};

const EditProduct = () => {
  // TODO isolate into hook
  const [mode, setMode] = useState<Mode>(Mode.Edit);
  const [files, setFiles] = useState<Array<File | IProductImage>>([]);
  const [productData, setProductData] = useState(initialData);
  const [previewImages, setPreviewImages] = useState<
    Array<IProductPreviewImage>
  >([]);
  const [mainImage, setMainImage] = useState<File | IProductImage>();
  const [fileList, setFileList] = useState<FileList | null>(null);
  const params = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["get/product"], {
    queryFn: () => Api.products.getById(params.id as string),
    enabled: !!params.id,
  });

  const {
    mutate: updateProduct,
    isLoading: isLoadingMutation,
    error: mutationError,
  } = useMutation({
    mutationFn: (productData: FormData) =>
      Api.products.update(productData, product.id),
  });

  useEffect(() => {
    if (product) {
      const { ...productData } = product;
      setProductData(productData);

      let isFirstEl = true;

      const previewImages = product.images.map((i) => ({ path: i.path }));

      setFiles(product.images);
      setPreviewImages(previewImages);
    }
  }, [product]);

  if (error) return <div>{JSON.stringify(error)}</div>;
  if (isLoading) return <div>loading...</div>;

  const handleChangeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const target = e.currentTarget ?? e.target;
    setProductData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (previewImages.length > 4) return;

    const filesList = e.target.files;
    if (fileList) {
      setFileList((prev) => [...prev, ...filesList]);
    } else {
      setFileList(filesList);
    }
    const files: File[] = [] as File[];

    if (filesList) {
      for (let i = 0; i < filesList.length; i++) {
        files.push(filesList[i]);
      }

      setFiles((prev) => [...prev, ...files]);

      const previewImages = files
        .map((f) => URL.createObjectURL(f))
        .map((imagePath) => ({
          path: imagePath,
          isMain: false,
        }));

      setPreviewImages((prev) => [...prev, ...previewImages]);
    }
  };

  const handleClickPreviewImage = (e: React.MouseEvent<HTMLDivElement>) => {
    const imageIdx = Number(e.currentTarget.getAttribute("data-idx"));
    setMainImage(files[imageIdx]);

    let newMainImg;
    const newPreviewImages = previewImages.map((i, idx) => {
      if (i.isMain && idx !== imageIdx) {
        return {
          ...i,
          isMain: false,
        };
      }

      if (idx === imageIdx) {
        newMainImg = i;
        return {
          ...i,
          isMain: true,
        };
      }

      return { ...i };
    });
    setPreviewImages(newPreviewImages);

    setProductData((prev) => ({
      ...prev,
      images: [newMainImg],
      mainImage: previewImages[imageIdx],
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, price, images } = productData;
    // todo is can send
    let data = new FormData();

    try {
      data.append("name", name);
      data.append("description", description);
      data.append("price", price);

      const existImages = files.filter((f) => f.id);
      const newImages = files.filter((f) => !f.id);

      if (mainImage.id) {
        data.append("mainImageId", mainImage.id);
      } else {
        data.append("mainImage", mainImage);
      }

      for (let i = 0; i < existImages.length; i++) {
        data.append("existImages", existImages[i]);
      }

      for (let i = 0; i < newImages.length; i++) {
        data.append("images", newImages[i]);
      }

      updateProduct(data);
    } catch (error: any) {
      console.log(error);
    }
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
              changeImage={handleChangeFileInput}
              changeInput={handleChangeInput}
              onSubmit={onSubmit}
              formData={productData}
              previewImages={previewImages}
              setMainImage={handleClickPreviewImage}
            />
          </div>
        </div>
      )}
      {!product && <div>product not found</div>}
    </>
  );
};

export default EditProduct;
