import * as Api from "@/api";
// import ProductsList from "@/app/components/modules/ProductsList/ProductsList";
import Home from "@/app/components/templates/Home/Home";

// export const revalidate = 60;

const HomePage = async () => {
  // const products = await Api.products.getAll();

  // if (!products) return null;

  return <Home />;
};

// return (
//     <>
//       <div>header bottom</div>
//       <section>
//         <Home />
//         <ProductsList products={products} />
//       </section>
//     </>
//   );
export default HomePage;
