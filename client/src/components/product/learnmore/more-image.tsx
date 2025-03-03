import { useState } from "react";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MoreImage = ({
  galleryRef,
  galleryImages,
  productName,
}: {
  galleryRef: React.RefObject<null>;
  galleryImages: string[];
  productName: string;
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const totalImages = galleryImages.length; // Get total images dynamically

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      //@ts-expect-error: fix later
      galleryRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    setActiveImageIndex((prevIndex) => {
      if (direction === "left") {
        return Math.max(prevIndex - 1, 0); // Prevent going below 0
      } else {
        return Math.min(prevIndex + 1, totalImages - 1); // Prevent exceeding max index
      }
    });
  };

  return (
    <section className="mb-32">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
        Take a closer look.
      </h2>

      <div className="relative">
        <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => scrollGallery("left")}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
        </div>

        <div
          ref={galleryRef}
          className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[350px] md:w-[500px] snap-center"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} - View ${index + 1}`}
                className="w-full h-auto rounded-2xl object-cover aspect-square"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => scrollGallery("right")}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === activeImageIndex ? "bg-blue-600 w-4" : "bg-gray-300"
              }`}
              onClick={() => {
                setActiveImageIndex(index);
                if (galleryRef.current) {
                  const scrollPosition = index * (350 + 24); // width + gap
                  // TODOS: FIX THIS CAROUSEL
                  //@ts-expect-error: Fix later
                  galleryRef.current.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <span className="sr-only">View image {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreImage;
