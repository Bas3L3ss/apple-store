import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../../models/Order";

export const GetOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ success: false, message: "Order ID is required" });
      return;
    }
    // TODO: Vague, make sure this productOptions is from each orderItem not the OrderId specifically
    const order = await OrderModel.findById(id).populate("productOptions");

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
