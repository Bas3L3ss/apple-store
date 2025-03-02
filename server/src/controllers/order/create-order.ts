import { Request, Response, NextFunction } from "express";
import { Order, OrderStatus } from "../../@types";
import { OrderModel } from "../../models/Order";
import Account from "../../models/Account";

export const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.auth; // Assuming `req.auth` is populated via authentication middleware

    if (!user) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }

    // ✅ Ensure only Stripe or verified users can create an order
    if (user.role !== "admin" && user.role !== "stripe") {
      const existingUser = await Account.findById(user.id);
      if (!existingUser || !existingUser.verified) {
        return next({ statusCode: 403, message: "Account not verified" });
      }
    }

    // ✅ Ensure order data is valid and bind `orderItems`
    const { orderItems, totalAmount, paymentIntentId } = req.body;
    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return next({ statusCode: 400, message: "Invalid order items" });
    }

    // ✅ Bind `userId` to order
    const orderData: Order = {
      userId: user.id,
      orderItems,
      totalAmount,
      paymentIntentId,
      status: OrderStatus.PREPARING, // Default status
    };

    const order = new OrderModel(orderData);
    await order.save();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
