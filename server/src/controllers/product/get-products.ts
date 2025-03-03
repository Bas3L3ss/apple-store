import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";

export const GetProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search, category } = req.query as {
      search?: string;
      category?: string;
    };
    const filter: Record<string, any> = {};

    // Full-text search on name & description
    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    const products = await ProductModel.find(filter).populate("productOptions");

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};
