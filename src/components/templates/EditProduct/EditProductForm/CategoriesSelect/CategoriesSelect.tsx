import * as Icons from "react-icons/md";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./CategoriesSelect.module.scss";

type Props = {
  categories?: ICategories;
  existsCategories: Array<string>;
  handleCategoryClick: (id: string) => void;
};

const CategoriesSelect = ({
  categories,
  existsCategories,
  handleCategoryClick,
}: Props) => {
  if (!categories) return null;

  const content = categories.map((c) => {
    const Icon = Icons[c.icon as keyof typeof Icons];
    return (
      <li
        onClick={() => handleCategoryClick(c.id)}
        key={c.id}
        className={`${styles["category"]} ${
          
          existsCategories.includes(c.id) && `${styles["selected"]}`
        }`}
      >
        <span className={styles["icon"]}>
          <Icon />
        </span>
        <span className={styles["title"]}>{c.title.en}</span>
      </li>
    );
  });

  return <ul className={styles["categories"]}>{content}</ul>;
};

export default CategoriesSelect;
