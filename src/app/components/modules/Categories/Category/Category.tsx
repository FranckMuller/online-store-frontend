import Image from "next/image";
import type { ICategory } from "@/interfaces/categories.interface";

import styles from "./Category.module.scss";

type Props = {
  category: ICategory;
};

const Category = ({ category }: Props) => {
  if (!category) return null;

  return (
    <div className={styles["category"]}>
      <div className={styles["image"]}>
        <Image src={category.image} alt={category.name} width={50} height={50} />
      </div>
      <p className={styles["name"]}>{category.name}</p>
    </div>
  );
};

export default Category;
