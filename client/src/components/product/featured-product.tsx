import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/src/@types";
import { formatPrice } from "@/src/lib/utils";

interface FeaturedProductProps {
  product: Product;
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500">
            {product.description}
          </p>
          <p className="text-2xl font-medium text-gray-900">
            From {formatPrice(product.basePrice)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg">
              <a href={`/shop/${product.slug ?? product.name}`}>Buy Now</a>
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-gray-300 text-gray-900"
            >
              <a
                className="flex items-center"
                href={`/more/${product.slug ?? product.name}`}
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ stiffness: 300 }}
          className="relative aspect-square w-full max-w-lg mx-auto lg:mx-0"
        >
          <img
            src={product.productImages[0] || "/placeholder.svg"}
            alt={product.name}
            className="object-cover rounded-2xl shadow-xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
