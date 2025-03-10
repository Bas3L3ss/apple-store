import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { ArrowLeft, ShoppingBag, MapPin, MessageSquare } from "lucide-react";
import { EmptyCart } from "../components/cart/empty-cart";
import { GuestCartAlert } from "../components/cart/sync-cart-alert";
import { CartItem } from "../components/cart/cart-item";
import { CartSummary } from "../components/cart/cart-summary";
import { useAuth } from "../contexts/AuthContext";
import { handleStripeCheckout } from "../action/checkout";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import NotesForm from "../components/cart/notes-form";
import { ShippingAddress } from "../@types";
import AddressForm from "../components/cart/address-form";
import { formatAddress } from "../lib/utils";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const { isLoggedIn: isAuthenticated, account } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [addressData, setAddressData] = useState<ShippingAddress | null>(null);
  const [orderNotes, setOrderNotes] = useState<string>("");
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyCart />
      </div>
    );
  }

  const handleCheckout = async () => {
    const errors = [];
    if (!addressData) {
      errors.push("Shipping address is required");
    }
    if (!account?.verified) {
      toast.error("Payment cancelled", {
        description:
          "Your account has not been verfied, proceed to profile setting and verify your email",
        action: { label: "Go to setting", onClick: () => navigate("/profile") },
      });

      return;
    }
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setIsLoading(true);

    // Enhanced checkout data
    const checkoutData = {
      items,
      shippingAddress: addressData,
      orderNotes,
    };

    await handleStripeCheckout(setIsLoading, checkoutData);
  };

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

          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <h3 className="font-medium text-gray-900">Shipping Address</h3>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    {addressData ? "Edit" : "Add"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Shipping Address</DialogTitle>
                  </DialogHeader>
                  <AddressForm
                    onSave={(address) => setAddressData(address)}
                    initialValue={addressData}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {addressData ? (
              <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                <p>{formatAddress(addressData)}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No address added yet
              </p>
            )}
          </div>

          {/* Order Notes Section */}
          <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                <h3 className="font-medium text-gray-900">Order Notes</h3>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    {orderNotes ? "Edit" : "Add"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Order Notes</DialogTitle>
                  </DialogHeader>
                  <NotesForm onSave={setOrderNotes} initialValue={orderNotes} />
                </DialogContent>
              </Dialog>
            </div>

            {orderNotes ? (
              <div className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                <p>{orderNotes}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No notes added yet</p>
            )}
          </div>

          {/* Validation Errors */}
          {formErrors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md">
              {formErrors.map((error, index) => (
                <p key={index} className="text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
          )}

          {isAuthenticated ? (
            <Button
              onClick={handleCheckout}
              className={`w-full mt-6 py-3 px-4 rounded-md font-medium transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Proceed to Checkout"}
            </Button>
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
