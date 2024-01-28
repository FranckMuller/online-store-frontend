import * as Api from "@/api";
import BrowseProduct from "@/components/templates/BrowseProduct/BrowseProduct";

import type {Metadata} from  'next'

type Props = {
  params: {
    productId: string;
  };
};

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const product = await Api.products.getById(params.productId);
  
  return {
    title: product.name,
    description: product.description
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
