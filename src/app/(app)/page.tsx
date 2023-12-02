import { Suspense } from "react";
import Home from "@/components/templates/Home/Home";
import HomeSkeleton from "@/components/skeletons/Home/HomeSkeleton";

const HomePage = async () => {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Home />
    </Suspense>
  );
};
export default HomePage;
