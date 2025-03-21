import { useState, useRef, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import StickyBuyButton from "../components/product/learnmore/sticky-buy-button";
import MoreHero from "../components/product/learnmore/more-hero";
import ProductOverView from "../components/product/learnmore/product-overview";
import MoreImage from "../components/product/learnmore/more-image";
import TechSpec from "../components/product/learnmore/tech-spec";
import MoreCTA from "../components/product/learnmore/more-cta";
import CustomerReview from "../components/product/learnmore/customer-review";
import { useProductGetBySlug } from "../react-query-hooks/use-get-product-by-slug";
import GlobalLoader from "../components/global-loader";
import SEO from "../components/SEO";

const ItemDetails = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useProductGetBySlug(slug);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const galleryRef = useRef(null);

  // Scroll handler for sticky buy button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBuyButton(true);
      } else {
        setShowBuyButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // illusion, will find workaround
    document.title = `${product?.name ?? "Loading..."} - Buy Now | Apple Store`;
  }, [product]);

  if (isLoading) {
    return <GlobalLoader />;
  }
  if (!product) {
    return <Navigate to={"/not-found"} />;
  }
  return (
    <>
      <SEO
        title={`${product.name} - Buy Now | Apple Store`}
        description={product.description}
        canonical={`https://yourstore.com/shop/${product.slug}`}
        image={
          product.productImages?.[0] ||
          "https://yourstore.com/default-image.jpg"
        }
        language="en"
        type="product"
        twitterCard="summary_large_image"
        twitterSite="@yourstore"
        twitterCreator="@yourstore"
        structuredData={{
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: product.productImages,
          brand: {
            "@type": "Brand",
            name: "Apple",
          },
          offers: {
            "@type": "Offer",
            price: product.basePrice,
            priceCurrency: "USD",
            availability: product.stock > 0 ? "InStock" : "OutOfStock",
            url: `https://yourstore.com/shop/${product.slug}`,
          },
        }}
      />
      {product.isFeatured && <h1 className="sr-only">featured product</h1>}
      <h2 className="sr-only">{product.name}</h2>
      <div className="bg-white">
        <StickyBuyButton product={product} showBuyButton={showBuyButton} />
        <MoreHero product={product} />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <ProductOverView product={product} />

          <MoreImage
            galleryRef={galleryRef}
            galleryImages={product.productImages}
            productName={product.name}
          />

          <TechSpec product={product} />
          <CustomerReview />

          <MoreCTA product={product} />
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
