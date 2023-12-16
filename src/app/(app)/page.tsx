import { Suspense } from "react";

import Home from "@/components/templates/Home/Home";
import HomeSkeleton from "@/components/skeletons/Home/HomeSkeleton";

import * as Api from "@/api";

export const dynamic = 'force-dynamic'

const HomePage = async () => {
  const products = await Api.products.getAll();

  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Home products={products} />
    </Suspense>
  );
};
export default HomePage;
