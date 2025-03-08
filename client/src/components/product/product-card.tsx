import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { Product } from "@/src/@types";
import { formatPrice, getColorHex } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300">
      <a href={`/shop/product/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={product.productImages[0] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover"
            />
          </motion.div>
        </div>
      </a>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>
        <p className="text-lg font-medium text-gray-900">
          {formatPrice(product.basePrice)}
        </p>

        {product.productOptions && product.productOptions.length > 0 && (
          <div className="flex items-center gap-1 mt-3">
            {product.productOptions
              .filter((option) => option.color) // Keep only options with color
              .slice(0, 5) // Limit to 5 colors
              .map((colorOption) => (
                <div
                  key={colorOption._id}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: getColorHex(colorOption.color),
                  }}
                />
              ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          to={`/shop/${product.slug ?? product.name}`}
          className="flex w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 items-center justify-center"
        >
          <ShoppingCart className="h-4 w-4 mr-2" /> Buy now
        </Link>
      </CardFooter>
    </Card>
  );
}
