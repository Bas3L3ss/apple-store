import { CartItem, ShippingAddress } from "@/src/@types";
import { makeAxiosRequest } from "@/src/lib/utils";
import { toast } from "sonner";

export const handleStripeCheckout = async (
  setIsLoading: (loading: boolean) => void,
  cartItems: {
    items: CartItem[];
    shippingAddress: ShippingAddress | null;
    orderNotes?: string;
  }
) => {
  setIsLoading(true);
  try {
    const { url: checkoutUrl } = await makeAxiosRequest<{ url: string }>(
      "post",
      "/checkout/session",
      {
        cartItems: cartItems.items,
        shippingAddress: cartItems.shippingAddress,
        orderNotes: cartItems.orderNotes,
      }
    );

    if (checkoutUrl) {
      window.location.href = checkoutUrl; // Redirect to Stripe checkout
    } else {
      console.error("No checkout URL returned");
      toast.error("Payment Error", {
        description: "Could not initiate payment. Please try again.",
      });
    }
  } catch (err) {
    console.error("Creating error:", err);
    toast.error("Payment Failed", {
      description: "There was an issue processing your payment.",
    });
  } finally {
    setIsLoading(false);
  }
};
