import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../@types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
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

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // @ts-expect-error: Placeholder
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
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
