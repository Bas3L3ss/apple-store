import React from "react";
import { formatPrice } from "@/src/lib/utils";
import { useCartStore } from "@/src/store/useCartStore";

export const CartSummary: React.FC = () => {
  const { items } = useCartStore();

  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);
  const tax = subtotal * 0.0825; // 8.25% tax rate
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">{formatPrice(subtotal)}</p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Shipping</p>
          <p className="font-medium">
            {subtotal > 0 ? formatPrice(shipping) : "Free"}
          </p>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-gray-600">Tax (estimated)</p>
          <p className="font-medium">{formatPrice(tax)}</p>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between text-base font-medium">
            <p className="text-gray-900">Total</p>
            <p className="text-gray-900">{formatPrice(total)}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Includes applicable taxes and shipping
          </p>
        </div>
      </div>
    </div>
  );
};
