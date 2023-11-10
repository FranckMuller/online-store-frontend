import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import * as Api from "@/api";
import type {
  IProduct,
  IProductImage,
  IProductPreviewImage,
} from "@/interfaces/products.interface";

type MutationProps = {
  formData: FormData;
  productId: string;
};

const initialData = {
  name: "",
  description: "",
  price: "",
  mainImage: { id: "", filename: "", path: "" },
  id: "",
  published: false,
};

export interface IEditProductFormData {
  name: string;
  description: string;
  price: string;
  published: boolean;
  mainImage: IProductImage;
  id: string;
}

type FileImage = {
  id: string;
  file: File;
};

export const useEditProduct = () => {
  const params = useParams();
  const [formData, setFormData] = useState<IEditProductFormData>(initialData);
  const [files, setFiles] = useState<Array<FileImage>>([]);
  const [deletingImagesIds, setDeletingImagesIds] = useState<Array<string>>([]);
  const [mainImageId, setMainImageId] = useState("");
  const [previewImages, setPreviewImages] = useState<
    Array<IProductPreviewImage>
  >([]);

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
    mutationFn: ({ formData, productId }: MutationProps) =>
      Api.products.update(formData, productId),
  });

  useEffect(() => {
    if (product) {
      const { images, ...data } = product;
      const previewImages = images.map((image) => ({
        ...image,
        isMain: false,
      }));
      setFormData(product);
      setPreviewImages(previewImages);
      setMainImageId(product.mainImage.id);
    }
  }, [product]);

  const handleChangeTextInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const target = e.currentTarget ?? e.target;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (previewImages.length > 4) return;
    const filesList = e.target.files;
    const files: Array<FileImage> = [] as Array<FileImage>;

    if (filesList) {
      for (let i = 0; i < filesList.length; i++) {
        files.push({ id: uuidv4(), file: filesList[i] });
      }

      setFiles((prev) => [...prev, ...files]);

      let previewImages: Array<IProductPreviewImage> = [];
      for (let i = 0; i < files.length; i++) {
        const previewImage = {
          id: files[i].id,
          path: URL.createObjectURL(files[i].file),
          isMain: false,
        };

        previewImages.push(previewImage);
      }

      setPreviewImages((prev) => [...prev, ...previewImages]);
    }
  };

  const handleClickPreviewImage = (id: string) => {
    let newMainImg: IProductPreviewImage;
    const newPreviewImages = previewImages.map((i) => {
      if (i.isMain && i.id !== id) {
        return {
          ...i,
          isMain: false,
        };
      }

      if (i.id === id) {
        newMainImg = i;
        return {
          ...i,
          isMain: true,
        };
      }

      return { ...i };
    });

    setPreviewImages(newPreviewImages);
    setMainImageId(id);
    setFormData((prev) => ({
      ...prev,
      mainImage: newMainImg,
    }));
  };

  const handleClickDeleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const newPreviewImages = previewImages.filter((image) => image.id !== id);
    const isNewImage = files.find((file) => file.id === id);

    if (isNewImage) {
      const newFiles = files.filter((file) => file.id !== id);
      setFiles(newFiles);
    }

    if (!isNewImage) {
      setDeletingImagesIds((prev) => [...prev, id]);
    }

    if (id === formData.mainImage.id) {
      setMainImageId("");
      setFormData((prev) => ({
        ...prev,
        mainImage: {
          ...prev.mainImage,
          path: "",
        },
      }));
    }

    setPreviewImages(newPreviewImages);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, price } = formData;
    // todo is can send
    let data = new FormData();

    try {
      data.append("name", name);
      data.append("description", description);
      data.append("price", price);

      if (deletingImagesIds.length) {
        data.append("deletingImagesIds", JSON.stringify(deletingImagesIds));
      }

      const newMainImage = files.find((file) => file.id === mainImageId);
      if (newMainImage) {
        data.append("mainImage", newMainImage.file);
      } else {
        data.append("mainImageId", mainImageId);
      }

      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          data.append("image", files[i].file);
        }
      }

      if (product && product.id) {
        updateProduct({ formData: data, productId: product.id });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    formData,
    isLoading,
    error,
    product,
    previewImages,
    handleChangeTextInput,
    handleChangeFileInput,
    handleClickPreviewImage,
    handleClickDeleteImage,
    handleSubmit,
  };
};
