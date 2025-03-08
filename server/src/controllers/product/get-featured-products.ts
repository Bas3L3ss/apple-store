import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";

export const GetFeaturedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const amount = parseInt(req.query.amount as string) || 1; // Convert amount to a number

    const products = await ProductModel.find({ isFeatured: true }).limit(
      amount
    );

    if (products.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No featured products found" });
      return;
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};
