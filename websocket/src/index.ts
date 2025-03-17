import { Server } from "socket.io";
import { createServer } from "http";
import mongo from "./utils/mongo";
import { CartItemModel } from "./models/CartItem";
import { PORT } from "./constants";
import mongoose from "mongoose";
import { CartItem } from "./@types";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust this to match your frontend's domain
    methods: ["GET", "POST"],
  },
});

async function bootstrap() {
  await mongo.connect(); // Ensure MongoDB is connected
  console.log("MongoDB connected");

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if (!userId) {
      console.log("No userId provided, disconnecting");
      socket.disconnect();
      return;
    }

    if (userId) {
      socket.join(`user:${userId}`); // Join a room for the user
    }
    console.log(`User connected: ${userId}`);

    // Listen for cart updates from the client
    socket.on("cart:update", async (cartItems, callback) => {
      try {
        await CartItemModel.updateOne(
          { userId },
          { $set: { items: cartItems } },
          { upsert: true }
        );
        io.to(`user:${userId}`).emit("cart:updated", cartItems);
        console.log(`Cart updated for user: ${userId}`);
      } catch (err) {
        console.error("Cart update error:", err);
        if (callback)
          callback({ success: false, error: "Failed to update cart" });
      }
    });

    // Handle cart sync (similar to update but with callback)
    socket.on("cart:sync", async (data, callback) => {
      try {
        const { items } = data;

        await CartItemModel.deleteMany({ userId });

        const updatedItem = await CartItemModel.insertMany(
          items.map((i: { _id: string }) => ({
            ...i,
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for each item
          }))
        );
        io.to(`user:${userId}`).emit("cart:updated", updatedItem);
        console.log(`Cart synced for user: ${userId}`);
      } catch (err) {
        console.log("Cart sync error:", err);
        if (callback)
          callback({ success: false, error: "Failed to sync cart" });
      }
    });

    // Handle remove item
    socket.on("cart:remove_item", async (data, callback) => {
      try {
        const { cartId } = data;
        console.log(data);

        await CartItemModel.deleteOne({ _id: cartId });

        const updatedCart = await CartItemModel.find({ userId }).lean(); // Improve performance

        console.log(`Item removed from cart for user: ${userId}`);

        // Broadcast the update to all sockets of the same user
        io.to(`user:${userId}`).emit("cart:updated", updatedCart);
      } catch (err) {
        console.error("Remove item error:", err);
        if (callback)
          callback({ success: false, error: "Failed to remove item" });
      }
    });

    // Handle update quantity
    socket.on("cart:update_quantity", async (data, callback) => {
      try {
        const { cartId, change } = data; // Ensure userId is passed

        // Find the cart item by userId and cartId
        const cartItem = await CartItemModel.findOne({ userId, _id: cartId });

        if (!cartItem) {
          if (callback)
            callback({ success: false, error: "Cart item not found" });
          return;
        }

        // Calculate new quantity
        const newQuantity = cartItem.quantity + change;

        if (newQuantity <= 0) {
          // Remove the item if quantity is zero or below
          await CartItemModel.deleteOne({ userId, _id: cartId });
        } else {
          // Otherwise, update the quantity
          await CartItemModel.updateOne(
            { userId, _id: cartId },
            {
              $set: {
                quantity: newQuantity,
                totalPrice:
                  newQuantity * (cartItem.totalPrice / cartItem.quantity),
              },
            }
          );
        }

        // 🔥 Fetch the entire updated cart (excluding the deleted one)
        const updatedCart = await CartItemModel.find({ userId });

        // 🔄 Send the entire updated cart back to the user
        io.to(`user:${userId}`).emit("cart:updated", updatedCart);
        console.log(`Cart updated for user: ${userId}`);
      } catch (err) {
        console.error("Update quantity error:", err);
        console.log(err);

        if (callback)
          callback({ success: false, error: "Failed to update quantity" });
      }
    });

    // Handle clear cart
    socket.on("cart:clear", async (_, callback) => {
      try {
        await CartItemModel.deleteMany({ userId });

        io.to(`user:${userId}`).emit("cart:updated", []);
        console.log(`Cart cleared for user: ${userId}`);
      } catch (err) {
        console.error("Clear cart error:", err);
        if (callback)
          callback({ success: false, error: "Failed to clear cart" });
      }
    });

    // Handle get cart
    socket.on("cart:get", async (_, callback) => {
      try {
        const cart = await CartItemModel.find({ userId });
        const items = cart ? cart : [];

        console.log(`Cart retrieved for user: ${userId}`);
        if (callback) return callback({ success: true, data: { items } });
      } catch (err) {
        console.error("Get cart error:", err);
        if (callback) callback({ success: false, error: "Failed to get cart" });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
  });
}

bootstrap().catch(console.error);
