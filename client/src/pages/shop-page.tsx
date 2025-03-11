import { useEffect, useState } from "react";
import CategoryNav from "../components/product/category-nav";
import FeaturedProduct from "../components/product/featured-product";
import ProductGrid from "../components/product/product-grid";
import RecommendationCarousel from "../components/product/recommendation";
import Title from "../components/reusable/title";
import SEO from "../components/SEO";
import { ProductCategory } from "../@types";

const ShopPage = () => {
  const [productsFound, setProductsFound] = useState(0);
  useEffect(() => {
    // illusion, will find workaround
    document.title = `Apple products (${productsFound}) - Shop`;
  }, [productsFound]);

  return (
    <>
      <SEO
        title={
          productsFound === null
            ? "Apple products - Shop"
            : `Apple products (${productsFound}) - Shop`
        }
        description="Welcome to the Apple Store Clone. Shop the latest Apple products."
        canonical="https://your-website.com/" //fix later
        image="https://your-website.com/banner.png"
      />
      <div className="  bg-white">
        <section className="py-16 px-4 md:px-6 lg:px-8">
          <FeaturedProduct />
        </section>
        <section className="py-8 px-4 md:px-6 lg:px-8 border-b border-gray-200">
          <CategoryNav />
        </section>
        <section className="py-12 px-4 md:px-6 lg:px-8">
          <Title className="text-3xl font-semibold text-gray-900 mb-8">
            All Products
          </Title>
          <ProductGrid setProductsFound={setProductsFound} />
        </section>
        {/* Recommendation Carousel */}
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
          <Title className="text-3xl font-semibold text-gray-900 mb-8">
            You May Also Like
          </Title>
          <RecommendationCarousel
            amount={20}
            category={ProductCategory.Iphone}
          />
        </section>
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
          <Title className="text-3xl font-semibold text-gray-900 mb-8">
            You May Also Like
          </Title>
          <RecommendationCarousel amount={20} category={ProductCategory.Ipad} />
        </section>
      </div>
    </>
  );
};

export default ShopPage;
