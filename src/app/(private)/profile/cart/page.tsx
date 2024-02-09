'use client'
import dynamic from "next/dynamic";
import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

const Cart = dynamic(() => import("@/components/templates/Cart/Cart"), {
  ssr: false,
  loading: () => <PageSpinner isLoading={true} />
});

const CartPage = () => {
  return <Cart />;
};

export default Cart;
