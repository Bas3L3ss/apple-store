import { NextFunction, Request, Response } from "express";
import { ProductOptionModel } from "../../models/ProductOptions";

export const GetProductOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await ProductOptionModel.find();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};
