import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Product } from "@/src/@types";
import { cn } from "@/src/lib/utils";

const ProductBuyingGallery = ({
  configSectionRef,
  product,
}: {
  configSectionRef: React.RefObject<null | HTMLDivElement>;
  product: Product;
}) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  // TODO: if this is unecessary get rid of it
  const [isLoading, setIsLoading] = useState(true);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigateGallery(-1);
      } else if (e.key === "ArrowRight") {
        navigateGallery(1);
      } else if (e.key === "Escape" && isZoomed) {
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, isZoomed]);

  // Handle image navigation with boundary checks
  const navigateGallery = (direction: number) => {
    const newIndex = activeImage + direction;
    if (newIndex >= 0 && newIndex < product.productImages.length) {
      setActiveImage(newIndex);
      setIsLoading(true);
    }
  };

  // Handle scroll to configuration section
  const scrollToConfig = () => {
    configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle zoom functionality
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <section className="sticky h-[70vh] bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Main Image Container */}
      <div className="relative h-full flex items-center justify-center p-4">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 bg-opacity-75 z-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Main product image */}
        <div
          className={cn(
            "relative h-full w-full flex items-center justify-center transition-all duration-300",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
          onClick={toggleZoom}
        >
          <img
            src={product.productImages[activeImage] || "/placeholder.svg"}
            alt={`${product.name} - View ${activeImage + 1} of ${
              product.productImages.length
            }`}
            className={cn(
              "max-h-full max-w-full object-contain transition-all duration-300",
              isZoomed ? "scale-150" : "scale-100",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Navigation arrows - only show if more than one image */}
        {product.productImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "absolute left-4 rounded-full shadow-md bg-white/90 dark:bg-gray-800/90 transition-opacity duration-200 p-10",
                activeImage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-90 hover:opacity-100"
              )}
              onClick={() => navigateGallery(-1)}
              disabled={activeImage === 0}
              aria-label="Previous image"
            >
              <ArrowLeft className="size-10" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "absolute right-4 rounded-full shadow-md bg-white/90 dark:bg-gray-800/90 transition-opacity duration-200 p-10",
                activeImage === product.productImages.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-90 hover:opacity-100"
              )}
              onClick={() => navigateGallery(1)}
              disabled={activeImage === product.productImages.length - 1}
              aria-label="Next image"
            >
              <ArrowRight className="size-10" />
            </Button>
          </>
        )}
      </div>

      {/* Gallery controls and pagination */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4">
        {/* Thumbnail navigation */}
        <div className="flex justify-center gap-3 px-4 pb-2">
          {product.productImages.map((id, index) => (
            <button
              key={id}
              onClick={() => setActiveImage(index)}
              className={cn(
                "w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200",
                activeImage === index
                  ? "border-blue-600 scale-110"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`View image ${index + 1} of ${
                product.productImages.length
              }`}
              aria-current={activeImage === index ? "true" : "false"}
            >
              <img
                src={product.productImages[index]}
                alt=""
                className="w-full h-full object-cover "
              />
            </button>
          ))}
        </div>

        {/* Scroll to configuration button */}
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full shadow-md bg-white/90 dark:bg-gray-800/90 px-4 py-2"
          onClick={scrollToConfig}
        >
          Buy Product <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </section>
  );
};

export default ProductBuyingGallery;
