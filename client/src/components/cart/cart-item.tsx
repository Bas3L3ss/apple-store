import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType, Product } from "@/src/@types";
import { useCartStore } from "@/src/store/useCartStore";
import { formatPrice } from "@/src/lib/utils";

interface CartItemProps {
  cart: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ cart }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const product: Product = {
    description: "g",
    name: "hi",
    productImages: ["s "],
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.productImages[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{product.name}</h3>
          <p className="ml-4">{formatPrice(cart.totalPrice)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(cart.id, -1)}
              className="p-1 hover:bg-gray-100 rounded-l-md"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 py-1 min-w-[2rem] text-center">
              {cart.quantity}
            </span>
            <button
              onClick={() => updateQuantity(cart.id, +1)}
              className="p-1 hover:bg-gray-100 rounded-r-md"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(cart.id)} // Changed from item.id to cart.id
            className="text-red-500 hover:text-red-600 flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};
