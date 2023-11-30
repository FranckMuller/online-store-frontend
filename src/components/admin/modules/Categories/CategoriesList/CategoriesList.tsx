"use client";
import { useRef, useEffect } from "react";
import * as Api from "@/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Icons from "react-icons/md";
import CategoryItem from "../CategoryItem/CategoryItem";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";
import type { ICategories, ICategory } from "@/interfaces/categories.interface";

import styles from "./CategoriesList.module.scss";

type Props = {
  categories: ICategories;
};

const CategoriesList = ({ categories }: Props) => {
  const firstLoadingRef = useRef(true);
  const {
    data: items,
    isFetching,
  } = useQuery(["get/categories"], {
    queryFn: () => Api.categories.getAll(),
    initialData: categories,
  });

  useEffect(() => {
    if (firstLoadingRef.current && !isFetching) {
      firstLoadingRef.current = false;
    }
  }, [firstLoadingRef, isFetching]);

  const isLoading = !firstLoadingRef.current && isFetching;

  return (
    <div className={styles["categories-list"]}>
      {isLoading && <PageSpinner isLoading={isLoading} />}
      {items && items.length ? (
        items.map((c) => (
          <div className={styles["item"]} key={c.id}>
            <CategoryItem category={c} />
          </div>
        ))
      ) : (
        <p>categories not found</p>
      )}
    </div>
  );
};

export default CategoriesList;
