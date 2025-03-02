import { type RequestHandler } from "express";
import { ProductModel } from "../../models/Product";
import { CartItemModel } from "../../models/CartItem";

export const CreateOrUpdateCartItem: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { productId, selectedOptions, quantity } = req.body;
    const userId = req.auth?.uid;

    if (!userId) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }

    if (!productId || quantity <= 0) {
      return next({ statusCode: 400, message: "Invalid product or quantity" });
    }

    // Check if the product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next({ statusCode: 404, message: "Product not found" });
    }

    const totalPrice = product.basePrice;

    const existingItem = await CartItemModel.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      const newCartItem = new CartItemModel({
        userId,
        productId,
        selectedOptions,
        quantity,
        totalPrice,
      });
      await newCartItem.save();
    }

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    next(error);
  }
};
