import { model, Schema } from "mongoose";
import { Order, OrderStatus, PaymentMethod } from "../@types";

const OrderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    calculatedTotal: { type: Number, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
    shippingAddress: { type: String, required: false },
    orderNotes: { type: String, required: false },
    status: { type: String, enum: Object.values(OrderStatus), required: true },
    paymentMethod: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    estimatedDelivery: { type: Date, required: true },
  },
  { timestamps: true }
);

const OrderModel = model<Order>("Order", OrderSchema);
export { OrderModel };
