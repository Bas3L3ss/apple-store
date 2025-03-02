import { Request, Response, NextFunction } from "express";
import { Order } from "../../@types";
import { OrderModel } from "../../models/Order";

export const CreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO 1: Only stripe can call this or atleast allow to create Order, to avoid normal people creating order without paying
    // TODO 2: Bind OrderItems (meaning req.body has more than just Order)
    // TODO 3: Bind userId
    // TODO 4: Current user account must be verified to create one
    const user = req.auth;
    const orderData: Order = req.body;
    const order = new OrderModel(orderData);
    await order.save();
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
