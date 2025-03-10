import { useCartStore } from "@/src/store/useCartStore";

export const GuestCartAlert = () => {
  const { syncGuestCart, rejectGuestCart, hasGuestCart } = useCartStore();

  if (!hasGuestCart) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-1">
          <p className="text-sm text-blue-700">
            We noticed you have items in your cart from a previous session.
            Would you like to keep them?
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={syncGuestCart}
            className="text-xs font-medium text-blue-700 hover:text-blue-600"
          >
            Keep Items
          </button>
          <button
            onClick={rejectGuestCart}
            className="text-xs font-medium text-gray-600 hover:text-gray-500"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};
