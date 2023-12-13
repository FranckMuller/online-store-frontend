import type { ICategories, ICategory } from "@/interfaces/categories.interface";

import styles from "./CategoryFilter.module.scss";

const categories: ICategories = [
  {
    id: "1",
    name: "smartphones",
    title: {
      en: "Smartphones",
      ru: "Смартфоны",
    },
    icon: "MdMobileScreenShare",
  },
  {
    id: "2",
    name: "computers",
    title: {
      en: "Computers",
      ru: "Компьютеры",
    },
    icon: "MdComputer",
  },
  {
    id: "3",
    name: "electronic",
    title: {
      en: "Electronic",
      ru: "Электроника",
    },
    icon: "MdMemory",
  },
  {
    id: "4",
    name: "clothes",
    title: {
      en: "Clothes",
      ru: "Одежда",
    },
    icon: "MdCheckroom",
  },
  {
    id: "5",
    name: "home",
    title: {
      en: "Home",
      ru: "Дом",
    },
    icon: "MdHome",
  },
];

const CategoryFilter = () => {
  return (
    <div className={styles["category-filter"]}>
      <h4 className={styles["title"]}>Categories</h4>
      <ul className={styles["list"]}>
        {categories.map((c) => (
          <li className={styles["item"]} key={c.id}>
            <input id={c.id} type="checkbox" />
            <label htmlFor={c.id} className={styles["label"]}>{c.title.en}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
