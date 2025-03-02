import { Request, Response, NextFunction } from "express";
import { ProductModel } from "../../models/Product";
import { Product } from "../../@types";

export const CreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productData: Product = req.body;
    const product = new ProductModel(productData);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
