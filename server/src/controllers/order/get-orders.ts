import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../../models/Order";

export const GetOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.auth; // Assuming authentication middleware adds this

    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "User authentication required" });
      return;
    }

    // Retrieve all orders for the user
    const orders = await OrderModel.find({ userId: user.id }).populate(
      "orderItems.productOptions"
    );

    if (!orders.length) {
      res.status(404).json({ success: false, message: "No orders found" });
      return;
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};
