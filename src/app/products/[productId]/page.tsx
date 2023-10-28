import * as Api from "@/api";
import ProductCard from "@/app/components/modules/Products/ProductCard/ProductCard";

type Props = {
  params: {
    productId: string;
  };
};

export const generateStaticParams = async () => {
  const products = await Api.products.getAll();

  return products.map((p) => ({ productId: p.id }));
};

const ProductPage = async ({ params: { productId } }: Props) => {
  const product = await Api.products.getById(productId);

  return <ProductCard product={product} />;
};

export default ProductPage;
