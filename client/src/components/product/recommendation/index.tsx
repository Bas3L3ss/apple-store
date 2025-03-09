import { useRef, useState, useEffect } from "react";
import { Product } from "@/src/@types";
import { useProductRecommendations } from "@/src/react-query-hooks/use-get-product-recommendations";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SliderCard from "./slider-card";
import EmptyState from "./empty-state";
import NavigationButton from "./navigation-button";
import SliderCardSkeleton from "./slider-card-skeleton";

export default function RecommendationCarousel({
  category,
  amount,
}: {
  category: string;
  amount: number;
}) {
  const { data, isLoading, error } = useProductRecommendations(
    amount,
    category
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setScrollPosition(scrollLeft);
        setMaxScroll(scrollWidth - clientWidth);
        setIsAtStart(scrollLeft <= 10);
        setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 10);
      }
    };

    // Initial update
    updateScrollState();

    // Add scroll event listener
    const ref = carouselRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateScrollState);
      return () => ref.removeEventListener("scroll", updateScrollState);
    }
  }, [data]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;

      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mx-auto my-6 max-w-4xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading recommendations. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  const hasProducts = data && data.length > 0;

  return (
    <div className="w-full mx-auto relative group ">
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 transition-opacity duration-300">
        <NavigationButton
          direction="left"
          onClick={() => scroll("left")}
          disabled={isLoading || isAtStart || !hasProducts}
        />
      </div>

      <div className="overflow-hidden ">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto no-scrollbar gap-5 pb-4 pt-2 pl-[15%] pr-[5%]"
          style={{ scrollBehavior: "smooth" }}
        >
          {isLoading ? (
            Array(6)
              .fill(0)
              .map((_, index) => (
                <SliderCardSkeleton key={`skeleton-${index}`} />
              ))
          ) : !hasProducts ? (
            // Empty state
            <EmptyState />
          ) : (
            // Product cards
            data.map((product: Product) => (
              <SliderCard key={`${product.slug}`} product={product} />
            ))
          )}
        </div>
      </div>

      <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 transition-opacity duration-300">
        <NavigationButton
          direction="right"
          onClick={() => scroll("right")}
          disabled={isLoading || isAtEnd || !hasProducts}
        />
      </div>

      {hasProducts && data.length > 3 && (
        <div className="flex justify-center gap-1.5 mt-6 pl-[15%]">
          {Array(Math.ceil(data.length / 3))
            .fill(0)
            .map((_, index) => {
              const isActive =
                scrollPosition >=
                  (index * maxScroll) / Math.ceil(data.length / 3) &&
                scrollPosition <
                  ((index + 1) * maxScroll) / Math.ceil(data.length / 3);
              return (
                <div
                  key={`indicator-${index}`}
                  className={`size-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "bg-gray-800 w-3" : "bg-gray-300"
                  }`}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
