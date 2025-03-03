import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import { Product } from "@/src/@types";

const StickyBuyButton = ({
  showBuyButton,
  product,
}: {
  showBuyButton: boolean;
  product: Product;
}) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 transition-transform duration-300 ${
        showBuyButton ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg?height=60&width=60"
            alt={product.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500">From ${product.basePrice}</p>
          </div>
        </div>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          Buy
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StickyBuyButton;
