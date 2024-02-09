'use client'
import dynamic from "next/dynamic";

import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

const Checkout = dynamic(
  () => import("@/components/templates/Checkout/Checkout"),
  {
    ssr: false,
    loading: () => <PageSpinner isLoading={true} />
  }
);

const CheckoutPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
