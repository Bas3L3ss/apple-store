import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";
import redis from "../../utils/redis";

export const GetProductRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const amount = Math.max(parseInt(req.query.amount as string) || 5, 1);
    const category = req.query.category as string | undefined;

    const cacheKey = `recommendations:${category || "all"}:${amount}`;

    const cacheTTL = 600;

    const cachedRecommendations = await redis.get(cacheKey);

    if (cachedRecommendations) {
      console.log(`✅ Cache hit for ${cacheKey}`);
      res.status(200).json({ success: true, data: cachedRecommendations });
      return;
    }

    console.log(`❌ Cache miss for ${cacheKey}, fetching from database`);

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

    await redis.set(cacheKey, populatedProducts, cacheTTL);
    console.log(`✅ Cached ${cacheKey} for ${cacheTTL} seconds`);

    res.status(200).json({ success: true, data: populatedProducts });
  } catch (error) {
    console.error("Error in GetProductRecommendations:", error);
    next(error);
  }
};
