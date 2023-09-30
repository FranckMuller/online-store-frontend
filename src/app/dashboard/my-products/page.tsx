import * as Api from "@/api";
import ProductsList from "@/app/components/Products/ProductsList/ProductsList";

export const revalidate = 60;

const MyProductsPage = async () => {
  const products = await Api.products.getAll();

  if (!products) return null;

  return <ProductsList products={products} />;
};

export default MyProductsPage;
