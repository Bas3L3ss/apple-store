import { formatPrice } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";

const ProductBuyingHeader = ({
  totalPrice,
  productName,
  isDone,
  handleAddCart,
}: {
  totalPrice: number;
  productName: string;
  isDone: boolean;
  handleAddCart: () => void;
}) => {
  return (
    <header className="sticky top-0 z-30  bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 pt-14">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">{productName}</h1>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-lg font-medium">
            {formatPrice(totalPrice)}
          </span>
          <Button
            className="bg-blue-600 hover:bg-blue-700 rounded-full"
            disabled={!isDone}
            onClick={handleAddCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span className="hidden md:inline-block">Add to Bag</span>
            <span className="md:hidden">Buy</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ProductBuyingHeader;
