import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../@types";
import { v4 as uuidV4 } from "uuid";
import { io, Socket } from "socket.io-client";
import {
  syncCartWithBackend,
  removeCartItem,
  clearUserCart,
  updateCartItemQuantity,
} from "../action/cart";
import { WEBSOCKET_URL } from "../constants";
import { toast } from "sonner";

export interface CartInput {
  selectedOptions: string[];
  totalPrice: number;
  productId: string;
  userId?: string;
}

interface CartState {
  userItems: CartItem[];
  guestItems: CartItem[];
  socket: Socket | null;
  isConnected: boolean;
  temporaryFailedItems: CartItem[];
  addItem: (product: CartInput) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: -1 | 1) => void;
  clearCart: () => void;
  syncGuestCart: (userId: string) => void;
  rejectGuestCart: () => void;
  hasGuestCart: boolean;
  connectSocket: (userId: string) => void;
  disconnectSocket: () => void;
  retryFailedItems: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      userItems: [],
      guestItems: [],
      socket: null,
      isConnected: false,
      temporaryFailedItems: [],
      hasGuestCart: false,

      connectSocket: (userId: string) => {
        const socket = io(WEBSOCKET_URL, {
          query: { userId },
        });

        socket.on("connect", () => {
          set({ isConnected: true });

          // Fetch the user's cart from the database when connected
          socket.emit(
            "cart:get",
            null,
            (response: { success: boolean; data: { items: CartItem[] } }) => {
              if (response.success && response.data) {
                set({ userItems: response.data.items });
              } else {
                console.error("Failed to fetch cart data");
              }
            }
          );
        });

        socket.on("disconnect", () => {
          set({ isConnected: false });
          set({ userItems: [] });
          console.log("Disconnected from cart WebSocket");
        });

        socket.on("cart:updated", (updatedCart: CartItem[]) => {
          console.log(updatedCart);

          set({ userItems: updatedCart });
        });

        // Set socket without persisting it
        set(() => ({ socket }), false);
      },

      disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
          socket.disconnect();
          set({ socket: null, isConnected: false });
        }
      },

      addItem: (cart: CartInput) => {
        console.log(cart);

        if (cart.userId) {
          // User is logged in - add to user items
          const { userItems } = get();
          const existingItem = userItems.find(
            (item) =>
              item.productId === cart.productId &&
              JSON.stringify(item.selectedOptions.sort()) ===
                JSON.stringify(cart.selectedOptions.sort())
          );

          let updatedItems: CartItem[];

          if (existingItem) {
            updatedItems = userItems.map((item) =>
              item.productId === cart.productId &&
              JSON.stringify(item.selectedOptions.sort()) ===
                JSON.stringify(cart.selectedOptions.sort())
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    totalPrice:
                      item.totalPrice + item.totalPrice / item.quantity,
                  }
                : item
            );
          } else {
            const newItem = {
              ...cart,
              quantity: 1,
              _id: uuidV4(),
              userId: cart.userId,
            };
            updatedItems = [...userItems, newItem];
          }

          // Update local state first for immediate feedback
          set({ userItems: updatedItems });

          // Then sync with backend
          syncCartWithBackend(updatedItems).catch((error) => {
            console.error("Failed to sync cart with backend:", error);
            // Store the failed operation for retry
            set((state) => ({
              temporaryFailedItems: [
                ...state.temporaryFailedItems,
                ...updatedItems,
              ],
            }));
            toast.error("Failed to update cart", {
              description:
                "Your changes will be saved locally. Click to retry.",
              action: {
                label: "Retry",
                onClick: () => get().retryFailedItems(),
              },
            });
          });
        } else {
          const { guestItems } = get();
          const existingItem = guestItems.find(
            (item) =>
              item.productId === cart.productId &&
              JSON.stringify(item.selectedOptions.sort()) ===
                JSON.stringify(cart.selectedOptions.sort())
          );

          if (existingItem) {
            set({
              guestItems: guestItems.map((item) =>
                item.productId === cart.productId &&
                JSON.stringify(item.selectedOptions.sort()) ===
                  JSON.stringify(cart.selectedOptions.sort())
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      totalPrice:
                        item.totalPrice + item.totalPrice / item.quantity,
                    }
                  : item
              ),
              hasGuestCart: true,
            });
          } else {
            set({
              guestItems: [
                ...guestItems,
                { ...cart, quantity: 1, _id: uuidV4() },
              ],
              hasGuestCart: true,
            });
          }
        }
      },

      removeItem: (cartId: string) => {
        const { userItems, guestItems } = get();

        // Check if item exists in user cart
        const userItem = userItems.find((item) => item._id === cartId);

        if (userItem) {
          // Remove from user items
          const updatedItems = userItems.filter((item) => item._id !== cartId);
          set({ userItems: updatedItems });

          // Sync with backend
          removeCartItem(cartId).catch((error) => {
            console.error("Failed to remove item from backend:", error);
            toast.error("Failed to remove item", {
              description: "Item was removed locally but not on the server.",
            });
          });
        } else {
          // Remove from guest items
          set({
            guestItems: guestItems.filter((item) => item._id !== cartId),
            hasGuestCart: guestItems.length > 1, // Will be true if there are still items after removal
          });
        }
      },

      updateQuantity: (cartId: string, change: -1 | 1) => {
        const { userItems } = get();

        // Check if item exists in user cart
        const userItem = userItems.find((item) => item._id === cartId);

        if (userItem) {
          // Update user items
          const updatedItems = userItems
            .map((item) => {
              if (item._id === cartId) {
                const newQuantity = item.quantity + change;

                // If quantity goes to 0 or below, remove the item
                if (newQuantity <= 0) {
                  return null; // Will be filtered out below
                }

                return {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: newQuantity * (item.totalPrice / item.quantity),
                };
              }
              return item;
            })
            .filter(Boolean); // Remove null values
          //@ts-expect-error:no problem
          set({ userItems: updatedItems });

          // Sync with backend
          updateCartItemQuantity(cartId, change).catch((error) => {
            console.error("Failed to update item quantity on backend:", error);
            toast.error("Failed to update quantity", {
              description:
                "Quantity was updated locally but not on the server.",
            });
          });
        } else {
          // Update guest items
          //@ts-expect-error: no problem
          set((state) => {
            const updatedItems = state.guestItems
              .map((item) => {
                if (item._id === cartId) {
                  const newQuantity = item.quantity + change;

                  if (newQuantity <= 0) {
                    return null;
                  }

                  return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: newQuantity * (item.totalPrice / item.quantity),
                  };
                }
                return item;
              })
              .filter(Boolean);

            return {
              guestItems: updatedItems,
              hasGuestCart: updatedItems.length > 0,
            };
          });
        }
      },

      clearCart: () => {
        const { userItems } = get();

        // If there are user items, clear them on the backend too
        if (userItems.length > 0) {
          clearUserCart().catch((error) => {
            console.error("Failed to clear cart on backend:", error);
            toast.error("Failed to clear cart on server", {
              description: "Cart was cleared locally but not on the server.",
            });
          });
        }

        set({ userItems: [], guestItems: [], hasGuestCart: false });
      },

      syncGuestCart: (userId: string) => {
        const { guestItems, userItems } = get();

        if (guestItems.length > 0) {
          // Merge guest items with user items and sync with backend
          const mergedItems = [...userItems];

          // For each guest item, check if it exists in user items
          const authenticatedGuesItems = guestItems.map((i) => ({
            ...i,
            userId,
          }));
          authenticatedGuesItems.forEach((guestItem) => {
            const existingItemIndex = mergedItems.findIndex(
              (item) =>
                item.productId === guestItem.productId &&
                JSON.stringify(item.selectedOptions.sort()) ===
                  JSON.stringify(guestItem.selectedOptions.sort())
            );

            if (existingItemIndex >= 0) {
              // Update existing item quantity and price
              const existingItem = mergedItems[existingItemIndex];
              mergedItems[existingItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + guestItem.quantity,
                totalPrice: existingItem.totalPrice + guestItem.totalPrice,
              };
            } else {
              // Add as new item (with user ID)
              mergedItems.push({
                ...guestItem,
                userId: userId, // Use the userId from existing user items
              });
            }
          });

          // Update local state
          set({ userItems: mergedItems, guestItems: [], hasGuestCart: false });

          // Sync with backend
          syncCartWithBackend(mergedItems).catch((error) => {
            console.error("Failed to sync merged cart with backend:", error);
            toast.error("Failed to sync guest cart", {
              description:
                "Your cart was merged locally but not on the server.",
            });
          });
        } else {
          set({ hasGuestCart: false });
        }
      },

      rejectGuestCart: () => {
        // Clear the guest cart and mark that we no longer have one
        set({ guestItems: [], hasGuestCart: false });
      },

      retryFailedItems: () => {
        const { temporaryFailedItems, userItems } = get();

        if (temporaryFailedItems.length > 0) {
          // Attempt to sync all failed items with the backend
          syncCartWithBackend([...userItems, ...temporaryFailedItems])
            .then(() => {
              // On success, clear the failed items list
              set({ temporaryFailedItems: [] });
              toast.success("Cart synchronized successfully");
            })
            .catch((error) => {
              console.error("Retry failed:", error);
              toast.error("Synchronization failed again", {
                description: "Please try again later or contact support.",
              });
            });
        }
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        userItems: state.userItems,
        guestItems: state.guestItems,
        temporaryFailedItems: state.temporaryFailedItems,
        hasGuestCart: state.hasGuestCart,
        isConnected: state.isConnected,
        // Explicitly exclude socket from persistence
      }),
      onRehydrateStorage: () => (state) => {
        // Check if there's a guest cart when the store is rehydrated
        if (state && state.guestItems.length > 0) {
          state.hasGuestCart = true;
        }
      },
    }
  )
);
