import { Request, Response } from "express";
import { stripe } from "../utils/stripe";
import Stripe from "stripe";
import { WEBHOOKSECRET } from "../constants";
import { OrderModel } from "../models/Order";
import { OrderItemModel } from "../models/OrderItem";
import mongoose from "mongoose";
import { OrderStatus, PaymentMethod } from "../@types";

export const handleStripeWebhook = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    if (!sig) throw new Error("No Stripe signature found");

    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOKSECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const stripeSession = event.data.object as Stripe.Checkout.Session;

    try {
      // 🔥 Fetch the line items from the session
      const line_items = await stripe.checkout.sessions.listLineItems(
        stripeSession.id
      );
      const customer = await stripe.customers.retrieve(
        stripeSession.customer as string
      );

      console.log("Customer Metadata:", customer.metadata);
      console.log("Line Items:", line_items.data);

      // ✅ Extract order details
      const userId = customer.metadata.userId;
      if (!userId) throw new Error("User ID not found in metadata");

      // Start MongoDB transaction
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // ✅ Create Order first
        const newOrder = await new OrderModel({
          userId,
          calculatedTotal: stripeSession.amount_total! / 100,
          items: [], // Will populate after creating OrderItems
          status: OrderStatus.PREPARING,
          paymentMethod: PaymentMethod.CC,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        }).save({ session });

        // ✅ Create Order Items with the correct `orderId`
        const orderItems = await Promise.all(
          line_items.data.map(async (item) => {
            const orderItem = new OrderItemModel({
              orderId: newOrder._id, // Associate with the created Order
              productId: item.price?.product, // TODO: Assuming Stripe price stores product ID
              quantity: item.quantity,
              finalPrice: item.amount_total! / 100,
              selectedOptions: [], // TODO: Need to fetch from frontend or database
            });

            await orderItem.save({ session });
            return orderItem._id;
          })
        );

        // ✅ Update Order with orderItems
        newOrder.items = orderItems;
        await newOrder.save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        console.log("✅ Order & OrderItems saved to MongoDB:", newOrder);
        res.json({ received: true });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).send("Failed to process order.");
    }
  } else {
    res.json({ received: false });
  }
};
