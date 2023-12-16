import Catalog from "@/components/templates/Catalog/Catalog";

import * as Api from "@/api";

import type { IProductsFilters } from "@/interfaces/products.interface";

// type Props = {
//   searchParams: IProductsFilters;
// };

// export const revalidate = 1

const CatalogPage = async () => {
  // const products = await Api.products.getAll(searchParams);
  const categories = await Api.categories.getAll()
  // if (!products) return null;

  return (
    <>
      <Catalog categories={categories} />
    </>
  );
};

export default CatalogPage;
