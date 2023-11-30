"use client";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";
import type { CreateCategoryData } from "@/api/categories";

import styles from "./CategoryForm.module.scss";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState({ en: "", ru: "" });
  const [icon, setIcon] = useState("");
  const queryClient = useQueryClient();
  const {
    mutate: createCategory,
    isLoading,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: CreateCategoryData) => Api.categories.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get/categories"] });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setTitle({ en: "", ru: "" });
      setIcon("");
    }
  }, [isSuccess]);

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setTitle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeIcon = (e: React.FormEvent<HTMLInputElement>) => {
    setIcon(e.currentTarget.value);
  };

  const onBlur = () => {};

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      title,
      icon,
    };

    createCategory(data);
  };

  const canSave = !!name && !!title.en && !!title.ru && !!icon;
  const disabled = !canSave || isLoading

  return (
    <div className={styles["category-form"]}>
      <form onSubmit={onSubmit} className={styles["form"]}>
        <div className={`${styles["form-group"]}`}>
          <label htmlFor="name">Category name:</label>
          <input
            className={styles["form-control"]}
            id="name"
            name="name"
            placeholder="Enter category name"
            onChange={onChangeName}
            value={name}
            onBlur={onBlur}
          />
        </div>

        <div className={`${styles["form-group"]}`}>
          <label htmlFor="title">Category title:</label>
          <input
            className={styles["form-control"]}
            id="title"
            name="en"
            placeholder="Enter in en"
            onChange={onChangeTitle}
            value={title.en}
            onBlur={onBlur}
          />

          <input
            className={styles["form-control"]}
            name="ru"
            placeholder="Enter in ru"
            onChange={onChangeTitle}
            value={title.ru}
            onBlur={onBlur}
          />
        </div>

        <div className={`${styles["form-group"]}`}>
          <label htmlFor="icon">Category icon:</label>
          <input
            className={styles["form-control"]}
            id="icon"
            name="icon"
            placeholder="Choose category icon"
            onChange={onChangeIcon}
            value={icon}
            onBlur={onBlur}
          />
        </div>

        <div className={styles["submit-button-wrapper"]}>
          <button disabled={disabled} className={styles["submit-button"]}>
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
