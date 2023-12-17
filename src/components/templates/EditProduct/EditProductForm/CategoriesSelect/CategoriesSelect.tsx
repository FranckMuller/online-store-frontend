import * as Icons from "react-icons/md";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./CategoriesSelect.module.scss";

type Props = {
  categories?: ICategories;
  existCategoryId?: string;
  handleCategoryClick: (id: string) => void;
};

const CategoriesSelect = ({
  categories,
  existCategoryId,
  handleCategoryClick,
}: Props) => {
  if (!categories) return null;

  const content = categories.map((c) => {
    const Icon = Icons[c.icon as keyof typeof Icons];
    let selectedClass = existCategoryId === c.id ? "selected" : "";
    console.log(existCategoryId)

    return (
      <li
        onClick={() => handleCategoryClick(c.id)}
        key={c.id}
        className={`${styles["category"]} ${styles[selectedClass]}`}
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
