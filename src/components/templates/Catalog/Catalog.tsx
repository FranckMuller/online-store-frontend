"use client";

import { useQuery } from "@tanstack/react-query";

import { useFilters } from "./hooks/useFilters";

import ProductsList from "@/components/modules/Products/ProductsList/ProductsList";
import ProductsSort from "@/components/modules/Products/ProductsSort/ProductsSort";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

import * as Api from "@/api";

import type {
  IProducts,
  IProductsFilters,
} from "@/interfaces/products.interface";

import styles from "./Catalog.module.scss";

type Props = {
  initialProducts: IProducts;
};

const Catalog = ({ initialProducts }: Props) => {
  const { onChangeFilters, isUpdated, filtersParams } = useFilters();

  const {
    data: products,
    isFetching,
    isSuccess,
  } = useQuery(["get/products", filtersParams], {
    queryFn: () => Api.products.getAll(filtersParams),
    initialData: initialProducts,
    enabled: isUpdated,
  });

  return (
    <>
      {isFetching && <PageSpinner isLoading={isFetching} />}
      <h3 className={styles["title"]}>Catalog</h3>
      <div className={styles["sort"]}>
      <ProductsSort shouldHide={!isFetching} onChange={onChangeFilters} />
      </div>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
