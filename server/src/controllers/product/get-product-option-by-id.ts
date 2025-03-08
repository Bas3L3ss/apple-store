import { NextFunction, Request, Response } from "express";
import { ProductOptionModel } from "../../models/ProductOptions";

export const GetProductOptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const data = await ProductOptionModel.findById(id);

    if (!data) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};
