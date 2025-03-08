import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Product } from "@/src/@types";
import { motion } from "framer-motion";

const ProductBuyingGallery = ({
  configSectionRef,
  product,
}: {
  configSectionRef: React.RefObject<null | HTMLDivElement>;
  product: Product;
}) => {
  const scrollToConfig = () => {
    configSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="sticky h-[70vh] overflow-hidden bg-gray-50">
      <motion.div
        ref={configSectionRef}
        className="h-full flex items-center justify-center"
      >
        <img
          src={product.productImages[activeImage] || "/placeholder.svg"}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </motion.div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 ">
        {product.productImages.map((id, index) => (
          <button
            key={id}
            onClick={() => setActiveImage(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              activeImage === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={scrollToConfig}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductBuyingGallery;
