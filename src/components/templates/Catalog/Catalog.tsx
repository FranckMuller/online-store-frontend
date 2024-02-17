"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import ProductsFilters from "@/components/modules/Products/ProductsFilters/ProductsFilters";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";
import Select from "@/components/ui/Select/Select";
import Button, { EButtonVariants } from "@/components/ui/Button/Button";

import { useFetchProducts } from "@/hooks/products/useFetchProducts";
import { useQueryParams } from "@/hooks/use-query-params";

import * as Api from "@/api";

import {
  EProductsParamsKeys,
  EProductsSort,
  type IFetchProductsParams
} from "@/interfaces/products.interface";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./Catalog.module.scss";

const sortOptions = [
  {
    text: "High price",
    value: EProductsSort.HighPrice
  },
  {
    text: "Min price",
    value: EProductsSort.MinPrice
  },
  {
    text: "Newest",
    value: EProductsSort.Newest
  },
  {
    text: "Oldest",
    value: EProductsSort.Oldest
  }
];

type Props = {
  categories: ICategories;
};

const initProductsParamsObj = {
  sort: EProductsParamsKeys.Sort,
  searchTerm: EProductsParamsKeys.SearchTerm,
  rating: EProductsParamsKeys.Rating,
  minPrice: EProductsParamsKeys.MinPrice,
  maxPrice: EProductsParamsKeys.MaxPrice,
  category: EProductsParamsKeys.Category
};

type TInitProductsParamsObj = typeof initProductsParamsObj;

const Catalog = ({ categories }: Props) => {
  const [filtersOpened, setFiltersOpened] = useState(false);

  const { queryParams, updateQueryParams } =
    useQueryParams<TInitProductsParamsObj>(initProductsParamsObj);

  const fetchProducts = useFetchProducts(queryParams);

  const onSortProducts = (
    sortBy: keyof IFetchProductsParams,
    value: string
  ) => {
    updateQueryParams(sortBy, value);
  };

  const itemListColumnCount = filtersOpened ? "3" : "4";

  return (
    <>
      <PageSpinner isLoading={fetchProducts.isLoading} />
      <h3 className={styles["title"]}>Catalog</h3>
      <div className={styles["heading"]}>
        <Button
          text={`${filtersOpened ? "close" : "open"} filters`}
          variant={EButtonVariants.Secondary}
          onClick={() => setFiltersOpened(!filtersOpened)}
        />

        <div className={styles["sort"]}>
          <Select
            options={sortOptions}
            defaultOption={sortOptions[0]}
            onChange={(value: EProductsSort) =>
              onSortProducts(EProductsParamsKeys.Sort, value)
            }
          />
        </div>
      </div>
      <div className={styles["filters-products"]}>
        {filtersOpened && (
          <div className={styles["filters"]}>
            <ProductsFilters
              updateFilters={onSortProducts}
              categories={categories}
              filtersParams={queryParams}
            />
          </div>
        )}
        {fetchProducts.products && (
          <ProductsList
            columnCount={itemListColumnCount}
            products={fetchProducts.products}
          />
        )}
      </div>
    </>
  );
};

export default Catalog;
