import { RequestHandler } from "express";
import { CartItemModel } from "../../models/CartItem";

export const DeleteCartItem: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.auth?.uid;
    const { productId } = req.body;

    if (!userId) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }

    if (productId) {
      // Delete a specific product from cart
      const deleted = await CartItemModel.findOneAndDelete({
        userId,
        productId,
      });
      if (!deleted) {
        return next({ statusCode: 404, message: "Cart item not found" });
      }
    } else {
      // Clear the whole cart
      await CartItemModel.deleteMany({ userId });
    }

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    next(error);
  }
};
