import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType, Product } from "@/src/@types";
import { useCartStore } from "@/src/store/useCartStore";
import { formatPrice, getColorHex } from "@/src/lib/utils";
import { useGetProductById } from "@/src/react-query-hooks/use-get-product-by-id";
import CloudinaryImage from "../reusable/cloudinary-image";

interface CartItemProps {
  cart: CartItemType;
}

const EXCLUDED_KEYS = [
  "_id",
  "productId",
  "price",
  "stock",
  "__v",
  "createdAt",
  "updatedAt",
];

export const CartItem = ({ cart }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  const { data, isLoading, isError } = useGetProductById(cart.productId);

  if (isLoading) {
    return (
      <div className="py-6 animate-pulse bg-gray-100 h-24 rounded-md"></div>
    );
  }
  if (isError || !data) {
    return <div className="py-6 text-red-500">Error loading product</div>;
  }

  const product: Product = data;

  const selectedOptionIds = new Set(cart.selectedOptions);

  // Process selected options in a single pass
  const selectedOptionsValue = {};
  product.productOptions.filter((opt) => {
    if (selectedOptionIds.has(opt._id)) {
      // Find the first key that isn't in excluded keys
      for (const key in opt) {
        if (!EXCLUDED_KEYS.includes(key)) {
          // @ts-expect-error: no prob
          selectedOptionsValue[key] = opt[key];
          break; // Only need to find the first valid key
        }
      }
      return true;
    }
    return false;
  });

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <CloudinaryImage
          publicId={product.productImages[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{product.name}</h3>
          <p className="ml-4">{formatPrice(cart.totalPrice)}</p>
        </div>

        {/* Rich description of selected options */}
        <div className="mt-1 text-sm text-gray-700">
          {Object.entries(selectedOptionsValue).map(([type, value], index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="font-medium capitalize">{type}:</span>
              {type.toLowerCase() === "color" ? (
                <div className="flex items-center gap-1">
                  <span
                    className="inline-block h-4 w-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: getColorHex(value as string) }}
                  />
                  <span>{value as string}</span>
                </div>
              ) : (
                <span>{value as string}</span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(cart._id, -1)}
              className="p-1 hover:bg-gray-100 rounded-l-md"
              aria-label="Decrease quantity"
              disabled={cart.quantity <= 1}
            >
              <Minus
                className={`h-4 w-4 ${
                  cart.quantity <= 1 ? "text-gray-300" : ""
                }`}
              />
            </button>
            <span className="px-2 py-1 min-w-[2rem] text-center">
              {cart.quantity}
            </span>
            <button
              onClick={() => updateQuantity(cart._id, +1)}
              className="p-1 hover:bg-gray-100 rounded-r-md"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(cart._id)}
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
