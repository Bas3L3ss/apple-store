import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";

export const GetProductRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Parse and validate query parameters
    const amount = Math.max(parseInt(req.query.amount as string) || 5, 1);
    const category = req.query.category as string | undefined;

    const matchStage = category ? { $match: { category } } : null;
    const pipeline = matchStage
      ? [matchStage, { $sample: { size: amount } }]
      : [{ $sample: { size: amount } }];

    const products = await ProductModel.aggregate(pipeline);

    const populatedProducts = await ProductModel.populate(products, {
      path: "productOptions",
    });

    if (populatedProducts.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No recommended products found" });
      return;
    }

    res.status(200).json({ success: true, data: populatedProducts });
  } catch (error) {
    next(error);
  }
};
