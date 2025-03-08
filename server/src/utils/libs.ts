import { CartItem } from "../@types";

export function calculateTotalPrice(cartItems: CartItem[]) {
  let totalPrice = 0;
  for (const item of cartItems) {
    totalPrice += item.totalPrice;
  }
  return totalPrice;
}
