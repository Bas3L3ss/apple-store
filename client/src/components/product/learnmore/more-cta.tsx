import { Link } from "react-router";
import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import { Product } from "@/src/@types";
import { formatPrice } from "@/src/lib/utils";

const MoreCTA = ({ product }: { product: Product }) => {
  return (
    <section className="mb-20">
      <div className="bg-gray-50 rounded-3xl p-12 md:p-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
          Ready to experience the iPhone 15 Pro?
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          From {formatPrice(product.basePrice)} or $41.62/mo. for 24 mo. before
          trade-in*
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={`/shop/${product.slug}`}>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Buy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          * Trade-in values vary based on condition, year, and configuration of
          your trade-in device.
        </p>
      </div>
    </section>
  );
};

export default MoreCTA;
