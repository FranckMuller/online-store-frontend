import Category from "./Category/Category";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";

import styles from "./Categories.module.scss";

const categories: ICategories = [
  {
    id: "1",
    name: "smartphones",
    title: {
      en: "Smartphones",
      ru: "Смартфоны",
    },
    image: "/uploads/avatar-mini.png",
  },
  {
    id: "2",
    name: "computers",
    title: {
      en: "Computers",
      ru: "Дом",
    },
    image: "/uploads/avatar-mini.png",
  },
  {
    id: "3",
    name: "electronic",
    title: {
      en: "Electronic",
      ru: "Электроника",
    },
    image: "/uploads/avatar-mini.png",
  },
  {
    id: "4",
    name: "clothes",
    title: {
      en: "Clothes",
      ru: "Одежда",
    },
    image: "/uploads/avatar-mini.png",
  },
  {
    id: "5",
    name: "home",
    title: {
      en: "Home",
      ru: "Дом",
    },
    image: "/uploads/avatar-mini.png",
  },
];

const Categories = async () => {
  return (
    <div className={styles["categories"]}>
      {categories?.length &&
        categories.map((c: ICategory) => (
          <div className={styles['category']}>
          
          <Category key={c.name} category={c} />
          </div>
        ))}
    </div>
  );
};

export default Categories;
