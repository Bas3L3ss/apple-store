import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../../models/Order";

export const GetOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.auth;
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "User authentication required" });
      return;
    }

    // Pagination parameters
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);
    const skip = (page - 1) * limit;

    // Fetch orders with pagination
    const orders = await OrderModel.find({ userId: user.id })
      .skip(skip)
      .limit(limit);
    const totalOrders = await OrderModel.countDocuments({ userId: user.id });

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};
