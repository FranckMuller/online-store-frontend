import Category from "./Category/Category";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";
import * as Icons from "react-icons/md";

import styles from "./Categories.module.scss";

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

const Categories = async () => {
  return (
    <div className={styles["categories"]}>
      {categories?.length &&
        categories.map((c: ICategory) => (
          <div className={styles["category"]}>
            <Category key={c.name} category={c} />
          </div>
        ))}
    </div>
  );
};

export default Categories;
