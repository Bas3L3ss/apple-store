import { useState, useRef, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { searchProducts } from "../lib/mockData";

import StickyBuyButton from "../components/product/learnmore/sticky-buy-button";
import MoreHero from "../components/product/learnmore/more-hero";
import ProductOverView from "../components/product/learnmore/product-overview";
import ChooseColor from "../components/product/learnmore/choose-color";
import MoreImage from "../components/product/learnmore/more-image";
import TechSpec from "../components/product/learnmore/tech-spec";
import { FeatureHighLight } from "../components/product/learnmore/feature-highlight";
import MoreCTA from "../components/product/learnmore/more-cta";
import CustomerReview from "../components/product/learnmore/customer-review";

const ItemDetails = () => {
  const { slug } = useParams();
  const product = searchProducts.find((p) => p.name === slug);
  const [showBuyButton, setShowBuyButton] = useState(false);
  const galleryRef = useRef(null);

  // Mock gallery images (in a real app, these would come from the product data)
  const galleryImages = [
    "/placeholder.svg?height=800&width=800&text=Front",
    "/placeholder.svg?height=800&width=800&text=Back",
    "/placeholder.svg?height=800&width=800&text=Side",
    "/placeholder.svg?height=800&width=800&text=Camera",
    "/placeholder.svg?height=800&width=800&text=Detail",
    "/placeholder.svg?height=800&width=800&text=Ports",
  ];

  // Mock colors with actual color values
  const colors =
    product?.productOptions
      .filter((option) => option.color)
      .map((option, index) => ({
        name: option.color,
        value:
          index === 0
            ? "#E3D0BB"
            : index === 1
            ? "#394F6B"
            : index === 2
            ? "#F5F5F0"
            : "#1F2020",
        price: option.price,
      })) || [];

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

  if (!product) {
    return <Navigate to={"/not-found"} />;
  }
  return (
    <div className="bg-white">
      <StickyBuyButton product={product} showBuyButton={showBuyButton} />
      <MoreHero product={product} />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ProductOverView product={product} />

        <ChooseColor colors={colors} product={product} />

        <MoreImage
          galleryRef={galleryRef}
          galleryImages={galleryImages}
          productName={product.name}
        />

        <FeatureHighLight />
        <TechSpec product={product} />
        <CustomerReview />

        <MoreCTA />
      </div>
    </div>
  );
};

export default ItemDetails;
