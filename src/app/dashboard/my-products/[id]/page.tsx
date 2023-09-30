import * as Api from "@/api";
import ProductCard from "@/app/components/Products/ProductCard/ProductCard";

type Props = {
  params: {
    id: string;
  };
};

export const generateStaticParams = async () => {
  const products = await Api.products.getAll();

  return products.map((p) => ({ id: p.id }));
};

const ProductPage = async ({ params: { id } }: Props) => {
  const product = await Api.products.getById(id);

  return <ProductCard product={product} />;
};

export default ProductPage
