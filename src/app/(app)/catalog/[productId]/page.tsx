import * as Api from "@/api";
import BrowseProduct from "@/components/templates/BrowseProduct/BrowseProduct";

type Props = {
  params: {
    productId: string;
  };
};

export const generateStaticParams = async () => {
  const products = await Api.products.getAll();

  return products.map(p => ({ productId: p.id }));
};

const ProductPage = async ({ params: { productId } }: Props) => {
  const product = await Api.products.getById(productId);

  return <BrowseProduct initialProduct={product} productId={productId} />;
};

export default ProductPage;
