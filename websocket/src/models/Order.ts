import { model, Schema } from "mongoose";
import { Order, OrderStatus, PaymentMethod } from "../@types";
import { OrderItemModel } from "./OrderItem";

const OrderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
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

OrderSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await OrderItemModel.deleteMany({ orderId: this._id });
      next();
    } catch (err) {
      // @ts-expect-error: no problem
      next(err);
    }
  }
);

const OrderModel = model<Order>("Order", OrderSchema);
export { OrderModel };
