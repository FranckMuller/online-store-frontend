import Catalog from "@/components/templates/Catalog/Catalog";

import * as Api from "@/api";

import type { IProductsFilters } from "@/interfaces/products.interface";

type Props = {
  searchParams: IProductsFilters;
};

const CatalogPage = async ({ searchParams }: Props) => {
  const products = await Api.products.getAll(searchParams);

  if (!products) return null;

  return (
    <>
      <Catalog initialProducts={products} />
    </>
  );
};

export default CatalogPage;
