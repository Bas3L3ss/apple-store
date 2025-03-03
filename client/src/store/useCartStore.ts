import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../@types";
import { v4 as uuidV4 } from "uuid";

export interface CartInput {
  selectedOptions: string[];
  totalPrice: number;
  productId: string;
  userId?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartInput) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: -1 | 1) => void;
  clearCart: () => void;
  syncGuestCart: () => void;
  rejectGuestCart: () => void;
  hasGuestCart: boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasGuestCart: false,

      addItem: (cart: CartInput) => {
        const { items } = get();
        console.log(items);
        const existingItem = items.find(
          (item) =>
            item.productId === cart.productId &&
            JSON.stringify(item.selectedOptions.sort()) ===
              JSON.stringify(cart.selectedOptions.sort())
        );
        if (existingItem) {
          set({
            items: items.map((item) =>
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
          });
        } else {
          set({
            items: [
              ...items,
              { ...cart, quantity: 1, id: uuidV4(), userId: cart.userId },
            ],
          });
        }
      },

      removeItem: (cartId: string) => {
        set({ items: get().items.filter((item) => item.id !== cartId) });
      },

      updateQuantity: (cartId: string, change: -1 | 1) => {
        //@ts-expect-error: that's fine
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === cartId) {
                const newQuantity = item.quantity + change;

                // If quantity goes to 0 or below, remove the item
                if (newQuantity <= 0) {
                  return null; // Will be filtered out below
                }

                return {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: newQuantity * (item.totalPrice / item.quantity), // Ensure per-item price stays correct
                };
              }
              return item;
            })
            .filter(Boolean); // Remove null values (items with quantity <= 0)

          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      syncGuestCart: () => {
        // This would typically merge the guest cart with the user's cart
        // For now, we'll just mark that we no longer have a guest cart
        set({ hasGuestCart: false });
      },

      rejectGuestCart: () => {
        // Clear the guest cart and mark that we no longer have one
        set({ items: [], hasGuestCart: false });
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        // Check if there's a guest cart when the store is rehydrated
        if (state && state.items.length > 0) {
          state.hasGuestCart = true;
        }
      },
    }
  )
);
