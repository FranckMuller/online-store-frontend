"use client";
import { useState } from "react";

import styles from "./CategoryForm.module.scss";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState({ en: "", ru: "" });
  const [icon, setIcon] = useState("");

  const onChangeName = () => {};
  const onChangeTitle = () => {};
  const onChangeIcon = () => {};
  const onBlur = () => {};

  const onSubmit = () => {};

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
            name="title"
            placeholder="Enter category title"
            onChange={onChangeTitle}
            value={title.en}
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
            <button className={styles["submit-button"]}>save</button>
          </div>
      </form>
    </div>
  );
};

export default CategoryForm;
