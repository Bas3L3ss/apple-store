import { model, Schema } from "mongoose";
import { CartItem } from "../@types";

const CartItemSchema = new Schema<CartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    selectedOptions: [{ type: Schema.Types.ObjectId, ref: "ProductOption" }],
    userId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartItemModel = model<CartItem>("CartItem", CartItemSchema);

export { CartItemModel };
