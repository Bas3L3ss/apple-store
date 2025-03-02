import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { EmptyCart } from "../components/cart/empty-cart";
import { GuestCartAlert } from "../components/cart/sync-cart-alert";
import { CartItem } from "../components/cart/cart-item";
import { CartSummary } from "../components/cart/cart-summary";
import { useAuth } from "../contexts/AuthContext";

const Cart: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const { isLoggedIn: isAuthenticated } = useAuth();

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <ShoppingBag className="h-8 w-8 mr-2" />
          Your Cart
        </h1>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
      </div>

      {isAuthenticated && <GuestCartAlert />}

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
            <div className="flow-root">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.id} cart={item} />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 mt-6 lg:mt-0">
          <CartSummary />

          {isAuthenticated ? (
            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              <Link
                to="/auth"
                className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium text-center hover:bg-blue-700 transition-colors"
              >
                Sign in to Checkout
              </Link>
            </div>
          )}

          <p className="mt-4 text-center text-sm text-gray-500">
            Secure checkout powered by Apple Pay
          </p>
        </div>
      </div>
    </div>
  );
};
export default Cart;
