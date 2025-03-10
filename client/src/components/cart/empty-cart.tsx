import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
      <h2 className="text-xl font-medium text-gray-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Looks like you haven't added anything to your cart yet. Explore our
        products and find something you'll love.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
};
