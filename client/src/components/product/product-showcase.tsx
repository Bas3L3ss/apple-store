import { Button } from "@/src/components/ui/button";
import { Product } from "@/src/@types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  product: Product;
  reversed?: boolean;
  bgColor?: string;
}

export default function ProductShowcase({
  title,
  subtitle,
  product,
  reversed = false,
  bgColor = "bg-gray-50",
}: ProductShowcaseProps) {
  return (
    <section className={`py-20 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-500 mt-2">
                {subtitle}
              </p>
              <div className="mt-8">
                <a href={`/shop/product/${product.id}`}>
                  <Button
                    variant="ghost"
                    className="group text-blue-600 hover:text-blue-700 px-0"
                  >
                    Learn more{" "}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square w-full max-w-lg mx-auto"
          >
            <img
              src={product.productImages[0] || "/placeholder.svg"}
              alt={product.name}
              className="object-cover rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
