import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import * as Api from "@/api";
import type { MutableRefObject } from "react";
import type {
  IProduct,
  IProductImage,
  IProductPreviewImage,
} from "@/interfaces/products.interface";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";

enum FieldsErrorsMsg {
  RequiredField = "required field",
  LimitImages = "no more than 5 images",
}

type EditProductMutationProps = {
  formData: FormData;
  productId: string;
};

const initialData = {
  name: "",
  description: "",
  price: "",
  mainImage: { id: "", filename: "", path: "" },
  published: false,
};

export type TEditProductFormData = Omit<IProduct, "images" | "id" | 'rating'>;

type FileImage = {
  id: string;
  file: File;
};

export type FieldsErrors = {
  name: string;
  description: string;
  price: string;
  images: string;
};

type FieldError = keyof FieldsErrors;

const initialFieldsErrors = {
  name: "",
  description: "",
  price: "",
  images: "",
};

// todo isolate clear error into useEffect
export const useEditProduct = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const errRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [formData, setFormData] = useState<TEditProductFormData>(initialData);
  const [files, setFiles] = useState<Array<FileImage>>([]);
  const [deletingImagesIds, setDeletingImagesIds] = useState<Array<string>>([]);
  const [mainImageId, setMainImageId] = useState("");
  const [previewImages, setPreviewImages] = useState<
    Array<IProductPreviewImage>
  >([]);
  const [fileInputError, setFileInputError] = useState("");
  const [fieldsErrors, setFieldsErrors] = useState(initialFieldsErrors);
  const [updateError, setUpdateError] = useState("");

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ["get/categories"],
    {
      queryFn: () => Api.categories.getAll(),
    }
  );

  const {
    data: product,
    isLoading: isLoadingProduct,
    error,
  } = useQuery(["get/product"], {
    queryFn: () => Api.products.getMyById(params.id as string),
    enabled: !!params.id,
  });

  const {
    mutate: updateProduct,
    isLoading: isLoadingMutation,
    error: mutationError,
  } = useMutation({
    mutationFn: ({ formData, productId }: EditProductMutationProps) =>
      Api.products.update(formData, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get/product"] });
    },
  });

  useEffect(() => {
    const initFormData = (product: IProduct) => {
      const { images, id, ...data } = product;
      const previewImages = images.map((image) => ({
        ...image,
        isMain: product.mainImage.id === image.id,
      }));

      setFormData(data);
      setPreviewImages(previewImages);
      setMainImageId(product.mainImage.id);
      setFiles([]);
    };

    if (product) {
      initFormData(product);
    }
  }, [product]);

  useEffect(() => {
    if (mutationError instanceof Error) {
      setUpdateError(mutationError.message);
    }
    if (axios.isAxiosError(mutationError) && mutationError.response) {
      setUpdateError(mutationError.response.data.message);
    }
  }, [mutationError]);

  const clearUpdateErr = () => {
    if (updateError) {
      setUpdateError("");
    }
  };

  const handleBlurInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.currentTarget ?? e.target;
    const fieldsErrorsKeys = Object.keys(fieldsErrors);
    if (target.value === "" && fieldsErrorsKeys.includes(target.name)) {
      setFieldsErrors((prev) => ({
        ...prev,
        [target.name]: FieldsErrorsMsg.RequiredField,
      }));
    }
  };

  const handleChangeTextInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    clearUpdateErr();

    const target = e.currentTarget ?? e.target;
    const name: FieldError = target.name as FieldError;

    if (fieldsErrors[name]) {
      setFieldsErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: target.value,
    }));
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearUpdateErr();

    setFormData((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearUpdateErr();

    let countImages = previewImages.length;
    if (e.target.files) {
      countImages += e.target.files.length;
    }

    if (countImages > 5) {
      setFieldsErrors((prev) => ({
        ...prev,
        images: FieldsErrorsMsg.LimitImages,
      }));
      return;
    }

    if (fieldsErrors.images) {
      setFieldsErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }

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
    clearUpdateErr();

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

    clearUpdateErr();

    if (fieldsErrors.images) {
      setFieldsErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }

    let newPreviewImages: Array<IProductPreviewImage>;
    newPreviewImages = previewImages.filter((image) => image.id !== id);

    // if is main image
    if (formData.mainImage.id === id) {
      newPreviewImages[0].isMain = true;
      setMainImageId(newPreviewImages[0].id);
      setFormData((prev) => ({
        ...prev,
        mainImage: newPreviewImages[0],
      }));
    }

    const isNewImage = files.find((file) => file.id === id);
    if (isNewImage) {
      const newFiles = files.filter((file) => file.id !== id);
      setFiles(newFiles);
    }

    if (!isNewImage) {
      setDeletingImagesIds((prev) => [...prev, id]);
    }

    setPreviewImages(newPreviewImages);
  };

  const handleCategoryClick = (categoryId: string) => {
    if(categories) {
    const category = categories.find(c => c.id === categoryId)
    setFormData((prev) => ({
      ...prev,
      category,
    }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, description, price, published, category } = formData;
    // todo is can send
    let data = new FormData();

    try {
      data.append("name", name);
      data.append("description", description);
      data.append("price", price);
      data.append("piblished", published.toString());
      if (category?.id) {
        data.append("category", category.id);
      }

      if (deletingImagesIds.length) {
        data.append("deletingImagesIds", JSON.stringify(deletingImagesIds));
      }

      const newMainImage = files.find((file) => file.id === mainImageId);
      // TODO isolate append formdata logic into separate function
      if (newMainImage) {
        const newMainImageIdx = files.findIndex(
          (file) => file.id === mainImageId
        );
        const start = files.slice(0, newMainImageIdx);
        const end = files.slice(newMainImageIdx + 1);
        const newFiles = [newMainImage, ...start, ...end];

        for (let i = 0; i < newFiles.length; i++) {
          data.append("image", newFiles[i].file);
        }
      } else if (!newMainImage && mainImageId) {
        data.append("mainImageId", mainImageId);
        if (files.length) {
          for (let i = 0; i < files.length; i++) {
            data.append("image", files[i].file);
          }
        }
      } else {
        if (files.length) {
          for (let i = 0; i < files.length; i++) {
            data.append("image", files[i].file);
          }
        }
      }

      if (product && product.id) {
        updateProduct({ formData: data, productId: product.id });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const isLoading =
    isLoadingProduct || isLoadingMutation || isLoadingCategories;
  const isNotFoundProduct = !isLoadingProduct && !error && !product;

  return {
    formData,
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
    fileInputError,
    fieldsErrors,
    handleBlurInput,
    errRef,
    categories,
    handleCategoryClick,
  };
};
