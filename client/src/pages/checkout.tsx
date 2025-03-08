import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();
  if (sessionId) {
    clearCart();
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 text-center px-6">
      <div className="max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment Successful
        </h1>
        <p className="text-gray-600 mt-2">
          Your order has been placed successfully.
        </p>
        {sessionId && (
          <p className="text-gray-500 text-sm mt-2">
            Transaction ID: {sessionId}
          </p>
        )}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export function CheckoutCancelled() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 text-center px-6">
      <div className="max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mt-2">You cancelled the payment process.</p>
        <button
          onClick={() => (window.location.href = "/checkout")}
          className="mt-6 px-6 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-800 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
