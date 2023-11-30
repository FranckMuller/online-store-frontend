import CategoryForm from "./CategoryForm/CategoryForm";
import CategoriesList from "./CategoriesList/CategoriesList";
import * as Api from "@/api";

import styles from "./Categories.module.scss";

const Categories = async () => {
  const categories = await Api.categories.getAll();

  return (
    <section className={styles["categories"]}>
      <div className={styles["form"]}>
        <CategoryForm />
      </div>
      <div className={styles["list"]}>
        <CategoriesList categories={categories} />
      </div>
    </section>
  );
};

export default Categories;
