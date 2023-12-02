import * as Api from "@/api";
import EditProduct from "@/components/templates/EditProduct/EditProduct";
import type { Metadata } from "next";

type Props = {
  params: {
    productId: string;
  };
};

export const metadata: Metadata = {
  title: "Edit product",
  description: "Edit your product",
};

const EditProductPage = () => {
  return (
  
      <EditProduct />
    
  );
};

export default EditProductPage;
