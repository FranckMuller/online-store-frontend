"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useProductsFilters } from "@/hooks/products/useProductsFilters";
import { useGetProducts } from "@/hooks/products/queries";

import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import ProductsSort from "@/components/modules/Products/ProductsSort/ProductsSort";
import ProductsFilters from "@/components/modules/Products/ProductsFilters/ProductsFilters";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

import * as Api from "@/api";

import type {
  IProducts,
  IProductsFilters
} from "@/interfaces/products.interface";
import type { ICategories } from "@/interfaces/categories.interface";

import styles from "./Catalog.module.scss";

type Props = {
  categories: ICategories;
  initialProducts: IProducts;
};

const Catalog = ({ categories, initialProducts }: Props) => {
  const [filtersOpened, setFiltersOpened] = useState(false);
  const { updateFilters, filtersParams } = useProductsFilters();
  const { products, isLoadingGetProducts } = useGetProducts(
    initialProducts,
    filtersParams
  );

  const itemListColumnCount = filtersOpened ? "3" : "4";

  return (
    <>
      {isLoadingGetProducts && <PageSpinner isLoading={isLoadingGetProducts} />}
      <h3 className={styles["title"]}>Catalog</h3>
      <div className={styles["heading"]}>
        <button
          onClick={() => setFiltersOpened(!filtersOpened)}
          className={`${styles["filters-button"]} btn-secondary`}
        >
          {filtersOpened ? "close" : "open"} filters
        </button>
        <div className={styles["sort"]}>
          <ProductsSort
            value={filtersParams.sort}
            updateFilters={updateFilters}
          />
        </div>
      </div>
      <div className={styles["filters-products"]}>
        {filtersOpened && (
          <div className={styles["filters"]}>
            <ProductsFilters
              updateFilters={updateFilters}
              categories={categories}
              filtersParams={filtersParams}
            />
          </div>
        )}
        {products && (
          <ProductsList columnCount={itemListColumnCount} products={products} />
        )}
      </div>
    </>
  );
};

export default Catalog;
