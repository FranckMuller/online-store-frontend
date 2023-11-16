import * as Api from "@/api";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./CategoriesList.module.scss";

type Props = {
  categories: ICategories;
};

const CategoriesList = ({ categories }: Props) => {
  if (!categories) return null;

  return (
    <div className={styles['categories-list']}>
      {categories.length ? (
        categories.map((c) => (
          <div key={c.id}>
            <p>{c.title.en}</p>
          </div>
        ))
      ) : (
        <p>categories not found</p>
      )}
    </div>
  );
};

export default CategoriesList;
