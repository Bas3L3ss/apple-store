import { model, Schema } from "mongoose";
import { OrderItem } from "../@types";

const OrderItemSchema = new Schema<OrderItem>(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    finalPrice: { type: Number, required: true },
    selectedOptions: [{ type: Schema.Types.ObjectId, ref: "ProductOption" }],
  },
  { timestamps: true }
);

const OrderItemModel = model<OrderItem>("OrderItem", OrderItemSchema);

export { OrderItemModel };
