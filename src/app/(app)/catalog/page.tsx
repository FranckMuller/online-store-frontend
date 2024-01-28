import Catalog from "@/components/templates/Catalog/Catalog";

import * as Api from "@/api";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextstore | Catalog",
  description: "Catalog of products",
  keywords: ["online store, buy, sell, products"]
};

const CatalogPage = async () => {
  const categoriesData = Api.categories.getAll();
  const productsData = Api.products.getAll();

  const [categories, products] = await Promise.all([
    categoriesData,
    productsData
  ]);

  return (
    <>
      <Catalog initialProducts={products} categories={categories} />
    </>
  );
};

export default CatalogPage;
