import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/src/lib/utils";
import { useGetFeaturedProductsWithAmount } from "@/src/react-query-hooks/use-get-featured-products-with-amount";
import GlobalLoader from "../global-loader";
import { Link } from "react-router";
import CloudinaryImage from "../reusable/cloudinary-image";

export default function FeaturedProduct() {
  const { data, isLoading: featuredProductLoading } =
    useGetFeaturedProductsWithAmount(1);

  if (featuredProductLoading) {
    return <GlobalLoader />;
  }
  const product = data[0] ?? null;
  if (!product) {
    return "try again later";
  }
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
              <Link to={`/shop/${product.slug ?? product.name}`}>Buy Now</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-gray-300 text-gray-900"
            >
              <Link
                className="flex items-center"
                to={`/more/${product.slug ?? product.name}`}
              >
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-square w-full max-w-lg mx-auto lg:mx-0">
          <CloudinaryImage
            publicId={product.productImages[0]}
            width={4000}
            height={4000}
            alt={product.name}
            className="object-cover rounded-2xl shadow-xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
