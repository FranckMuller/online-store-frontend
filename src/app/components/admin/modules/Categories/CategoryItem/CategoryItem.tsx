import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "@/api";
import * as Icons from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import type { ICategory } from "@/interfaces/categories.interface";

import styles from "./CategoryItem.module.scss";

type Props = {
  category: ICategory;
};

const CategoryItem = ({ category }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id: string) => Api.categories.deleteOne(id),
    onSuccess: () => queryClient.invalidateQueries(["get/categories"]),
  });

  const Icon = Icons[`${category.icon}` as keyof typeof Icons];
  return (
    <div className={styles["category-item"]}>
      <div className={styles["icon"]}>{Icon && <Icon />}</div>
      <div className={styles["info"]}>
        <span className={styles["name"]}>name: {category.name}</span>
        <span className={styles["title"]}>en: {category.title.en}</span>
        <span className={styles["title"]}>ru: {category.title.ru}</span>
      </div>
      <div className={styles["controls"]}>
        <button className={styles["edit"]}>
          <AiFillEdit />
        </button>
        <button
          onClick={() => deleteCategory(category.id)}
          className={styles["delete"]}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
