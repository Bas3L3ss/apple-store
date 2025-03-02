import { RequestHandler } from "express";
import { CartItemModel } from "../../models/CartItem";

export const GetCartItems: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.auth?.uid;

    if (!userId) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }
    // TODO: make sure populate is working
    const cartItems = await CartItemModel.find({ userId })
      .populate("productId", "name price")
      .populate("selectedOptions", "name value");

    res.status(200).json({ message: "Cart retrieved successfully", cartItems });
  } catch (error) {
    next(error);
  }
};
