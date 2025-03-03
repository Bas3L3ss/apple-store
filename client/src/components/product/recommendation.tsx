import { Button } from "@/src/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { searchProducts } from "@/src/lib/mockData";
import { Product, ProductCategory } from "@/src/@types";
import { checkIsNew, formatPrice } from "@/src/lib/utils";

export default function RecommendationCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const productsByCategory = searchProducts.reduce((acc, product) => {
    // @ts-expect-error: weird type missing
    if (!acc[product.category]) {
      // @ts-expect-error: weird type missing
      acc[product.category] = [];
    }
    // @ts-expect-error: weird type missing
    acc[product.category].push(product);
    return acc;
  }, {} as Record<number, typeof searchProducts>);

  const categories = [
    { id: ProductCategory.Iphone, name: "iPhone" },
    { id: ProductCategory.Macbook, name: "MacBook" },
    { id: ProductCategory.Ipad, name: "iPad" },
    { id: ProductCategory.AppleWatch, name: "Apple Watch" },
    { id: ProductCategory.AirPod, name: "AirPods" },
  ];

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8;

      if (direction === "left") {
        if (scrollPosition <= 0) {
          return;
        }
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      } else {
        if (
          scrollPosition >=
          (carouselRef.current?.scrollWidth || 0) -
            (carouselRef.current?.clientWidth || 0)
        ) {
          return;
        }
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
        setScrollPosition(
          Math.min(scrollWidth - clientWidth, scrollPosition + scrollAmount)
        );
      }
    }
  };

  return (
    <div className="  mx-auto relative group">
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className=" rounded-full bg-white/80 backdrop-blur-sm  border-gray-200 shadow-md h-10 w-10"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto no-scrollbar gap-6 pb-4 pt-2   pl-[15%]"
        style={{ scrollBehavior: "smooth" }}
      >
        {[
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
          ...categories,
        ].map((category) =>
          // @ts-expect-error: weird type missing
          productsByCategory[category.id]
            ?.slice(0, 1)
            .map((product: Product, index: number) => (
              <SliderCard key={`product.id ${index}`} product={product} />
            ))
        )}
      </div>

      <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 shadow-md h-10 w-10"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
const SliderCard = ({ product }: { product: Product }) => {
  const isNewProduct = checkIsNew(product.createdAt);
  return (
    <motion.a
      href={`/shop/${product.slug ?? product.name}`}
      whileHover={{
        scale: 1.009,
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.15)",
      }}
      transition={{
        duration: 0.3,
        ease: [0, 0, 0.5, 1],
      }}
      className="flex-shrink-0 w-[280px] cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow  p-[30px]"
    >
      {/* Product Image */}
      <div className="w-full h-[250px] flex justify-center items-center bg-gray-100 rounded-xl">
        <img
          src={product.productImages[0]}
          alt={product.name}
          className="object-cover"
        />
      </div>

      {/* Color Options */}
      <div>
        {product.productOptions && product.productOptions.length > 0 && (
          <div className="flex items-center gap-1   justify-center mt-[7px]">
            {product.productOptions.map((color) => (
              <div
                key={color.id}
                className="size-[12px] rounded-full border border-gray-300"
                style={{
                  backgroundColor: color.color!.toLowerCase().includes("silver")
                    ? "#C0C0C0"
                    : color.color!.toLowerCase().includes("space gray")
                    ? "#36454F"
                    : color.color!.toLowerCase().includes("rose gold")
                    ? "#B76E79"
                    : color.color!.toLowerCase().includes("black")
                    ? "#000000"
                    : color.color!.toLowerCase().includes("white")
                    ? "#FFFFFF"
                    : color.color!.toLowerCase().includes("blue")
                    ? "#0000FF"
                    : color.color!.toLowerCase().includes("titanium")
                    ? "#878681"
                    : "#CCCCCC",
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Product Details */}
      <div className="w-full text-left">
        {isNewProduct && (
          <p className="text-[#b64400] text-sm font-bold mb-1">New</p>
        )}
        <h3 className="text-[17px] font-[600] leading-[1.2353641176] ">
          {product.name}
        </h3>
        <p className="mt-[27px]  font-semibold text-[14px]">
          {formatPrice(product.basePrice)}
        </p>
      </div>
    </motion.a>
  );
};
