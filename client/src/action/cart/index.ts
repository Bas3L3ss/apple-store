import { CartItem } from "@/src/@types";
import { toast } from "sonner";
import { useCartStore } from "@/src/store/useCartStore";

// Helper function to get socket and check connection
const getSocket = () => {
  const socket = useCartStore.getState().socket;
  const isConnected = useCartStore.getState().isConnected;

  if (!socket || !isConnected) {
    throw new Error("Socket not connected");
  }

  return socket;
};

// Helper to create a promise-based socket request
const socketRequest = <T>(event: string, data: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      const socket = getSocket();

      socket.emit(
        event,
        data,
        (response: { success: boolean; data?: T; error?: string }) => {
          if (response.success && response.data) {
            resolve(response.data);
          } else {
            reject(new Error(response.error || "Request failed"));
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

export const syncCartWithBackend = async (cartItems: CartItem[]) => {
  try {
    await socketRequest("cart:sync", { items: cartItems });
    return true;
  } catch (err) {
    console.error("Error syncing cart with backend:", err);
    throw err;
  }
};

export const removeCartItem = async (cartId: string) => {
  try {
    await socketRequest("cart:remove_item", { cartId });
    return true;
  } catch (err) {
    console.error("Error removing cart item:", err);
    throw err;
  }
};

export const updateCartItemQuantity = async (
  cartId: string,
  change: number
) => {
  try {
    await socketRequest("cart:update_quantity", { cartId, change });
    return true;
  } catch (err) {
    console.log(err);

    console.error("Error updating cart item quantity:", err);
    throw err;
  }
};

export const clearUserCart = async () => {
  try {
    await socketRequest("cart:clear", {});
    return true;
  } catch (err) {
    console.error("Error clearing user cart:", err);
    throw err;
  }
};

export const getUserCart = async (): Promise<CartItem[]> => {
  try {
    const response = await socketRequest<{ items: CartItem[] }>("cart:get", {});
    return response.items;
  } catch (err) {
    console.error("Error fetching user cart:", err);
    toast.error("Failed to load your cart", {
      description: "Please refresh the page or try again later.",
    });
    return [];
  }
};
