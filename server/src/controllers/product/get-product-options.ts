import { NextFunction, Request, Response } from "express";
import { ProductOptionModel } from "../../models/ProductOptions";

export const GetProductOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: implement pagination

    // const page = parseInt(req.query.page as string) || 1;
    // const limit = parseInt(req.query.limit as string) || 10;
    // const skip = (page - 1) * limit;

    // const data = await ProductOptionModel.find().skip(skip).limit(limit);

    const data = await ProductOptionModel.find();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
};
