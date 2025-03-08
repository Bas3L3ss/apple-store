import { Request, Response, NextFunction } from "express";
import { ProductOption } from "../../@types";
import { ProductOptionModel } from "../../models/ProductOptions";

export const CreateProductOption = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productOptionData: ProductOption = req.body.product;

    const data = new ProductOptionModel(productOptionData);
    await data.save();
    res.status(201).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};
