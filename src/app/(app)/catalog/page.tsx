import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/app/getQueryClient";
import { EProductsParamsKeys } from "@/interfaces/products.interface";

import Catalog from "@/components/templates/Catalog/Catalog";

import * as Api from "@/api";

import type { Metadata } from "next";

const initProductsParamsObj = {
  sort: null,
  searchTerm: null,
  rating: null,
  minPrice: null,
  maxPrice: null,
  category: null
};

export const metadata: Metadata = {
  title: "Nextstore | Catalog",
  description: "Catalog of products",
  keywords: ["online store, buy, sell, products"]
};

const CatalogPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["get/products", initProductsParamsObj], {
    queryFn: () => Api.products.getAll()
  });
  const dehydratedState = dehydrate(queryClient);

  const categoriesData = Api.categories.getAll();

  const [categories] = await Promise.all([categoriesData]);

  return (
    <Hydrate state={dehydratedState}>
      <Catalog categories={categories} />
    </Hydrate>
  );
};

export default CatalogPage;
