import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";
export const GetProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    const product = await ProductModel.findOne({ slug }).populate(
      "productOptions"
    );

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
