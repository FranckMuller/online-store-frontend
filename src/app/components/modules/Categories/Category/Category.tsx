"use client";
import Image from "next/image";
import * as Icons from "react-icons/md";
import type { IconType } from "react-icons";
import type { ICategory } from "@/interfaces/categories.interface";

import styles from "./Category.module.scss";

type Props = {
  category: ICategory;
};

const Category = ({ category }: Props) => {
  if (!category) return null;
  const Icon: IconType = Icons[`${category.icon}` as keyof typeof Icons];

  return (
    <div className={styles["category"]}>
      <div className={styles["icon"]}>
        <Icon />
      </div>
      <p className={styles["name"]}>{category.name}</p>
    </div>
  );
};

export default Category;
