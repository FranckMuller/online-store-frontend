import EditProductForm from "@/app/components/Products/EditProductForm/EditProductForm";
import * as Api from "@/api";

type Props = {
  params: {
    id: string;
  };
};

export const generateStaticParams = async () => {
  const products = await Api.products.getAll();

  return products.map((p) => ({ id: p.id }));
};

const EditProductPage = async ({ params: { id } }: Props) => {
  console.log(id);
  const product = await Api.products.getById(id);
  if (!product) return null;
  return <EditProductForm product={product} />;
};

export default EditProductPage;
