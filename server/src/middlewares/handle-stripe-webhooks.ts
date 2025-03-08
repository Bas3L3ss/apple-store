import { RequestHandler } from "express";
import mongoose from "mongoose";
import { WEBHOOKSECRET } from "../constants";
import { stripe } from "../utils/stripe";
import { OrderItemModel } from "../models/OrderItem";
import { OrderModel } from "../models/Order";

export const handleStripeWebhook: RequestHandler = async (req, res, next) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];
    if (!signature || !WEBHOOKSECRET) {
      throw new Error("No signature or webhook secret found");
    }

    event = stripe.webhooks.constructEvent(req.body, signature, WEBHOOKSECRET);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
    return next({ statusCode: 400, message: "Webhook verification failed" });
  }

  const data = event.data.object;
  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const customer = await stripe.customers.retrieve(data.customer);
      if (!customer || !customer.metadata.userId) {
        throw new Error("Unauthorized order creation");
      }
      console.log(data);

      const userId = customer.metadata.userId;
      const cartItems = JSON.parse(customer.metadata.cartItems || "[]");

      if (!cartItems.length) {
        throw new Error("No items in order");
      }

      // Create OrderItems first
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          const orderItem = new OrderItemModel({
            productId: item.productId,
            quantity: item.quantity,
            finalPrice: item.totalPrice,
            selectedOptions: item.selectedOptions || [],
          });
          await orderItem.save({ session });
          return orderItem._id;
        })
      );

      // Create Order
      const order = new OrderModel({
        userId,
        calculatedTotal: data.amount_total / 100,
        items: orderItems,
        shippingAddress: "", // TODO: Can be updated later
        orderNotes: "",
        status: "PREPARING",
        paymentMethod: "CC",
        estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // next 2 weeks
      });

      await order.save({ session });
      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ success: true, data: order });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error processing Stripe webhook:", error);
      next(error);
    }
  } else {
    res.status(200).end();
  }
};
