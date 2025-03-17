import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";

export const GetProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id).populate("productOptions");

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
