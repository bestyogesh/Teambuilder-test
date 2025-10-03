"use client";
import { useEffect, useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {

  const [sortedProducts, setSortedProducts] = useState<ProductsTypes[]>([]);
  const [sortOrder, setSortOrder] = useState<"low" | "high" | "">("");

  // initialize with products
  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const handleSort = (order: string) => {
    console.log(order)
    setSortOrder(order as "low" | "high");
    let sorted = [...products];
    if (order === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "high") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  };

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center justify-between w-full px-4 relative">
        {/* Left dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="absolute left-4 top-1/2 -translate-y-1/2 border rounded px-2 py-1"
        >
          <option value="">Sort by</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
        {/* Centered title */}
        <h1
          className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
      font-sans font-extrabold sm:rounded-t-3xl text-center mx-auto"
        >
          Best Selling Headphones
        </h1>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        // className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:mx-20 overflow-hidden"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:mx-20 overflow-hidden"
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
