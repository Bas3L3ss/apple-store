import { NextFunction, Response } from "express";
import { OrderModel } from "../../models/Order";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";

export const GetOrderById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.auth;

    if (!id) {
      return next({ statusCode: 400, message: "Order ID is required" });
    }

    const order = await OrderModel.findById(id).populate({
      path: "items",
      populate: [
        {
          path: "selectedOptions", // Populate selected options
          model: "ProductOption",
        },
        {
          path: "productId", // Populate the actual product details
          model: "Product",
        },
      ],
    });

    if (!order) {
      return next({ statusCode: 404, message: "Order not found" });
    }

    if (order.userId.toString() !== userId.toString()) {
      return next({
        statusCode: 403,
        message: "You are not authorized to view this order",
      });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
