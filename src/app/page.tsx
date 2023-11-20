import { Suspense } from "react";
import Home from "@/app/components/templates/Home/Home";
import HomeSkeleton from "@/app/components/skeletons/Home/HomeSkeleton";

const HomePage = async () => {
  return (
    <>
      <Suspense fallback={<HomeSkeleton />}>
        <Home />
      </Suspense>
    </>
  );
};
export default HomePage;
