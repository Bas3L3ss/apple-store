import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";
import redis from "../../utils/redis";

export const GetFeaturedProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const amount = parseInt(req.query.amount as string) || 1; // Convert amount to a number
    const cacheKey = `featured-products:${amount}`;

    // Try to get featured products from cache first
    const cachedProducts = await redis.get(cacheKey);

    if (cachedProducts) {
      console.log(`✅ Cache hit for featured-products:${amount}`);
      res.status(200).json({ success: true, data: cachedProducts });
      return;
    }

    console.log(
      `❌ Cache miss for featured-products:${amount}, fetching from database`
    );

    const products = await ProductModel.find({ isFeatured: true }).limit(
      amount
    );

    if (products.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No featured products found" });
      return;
    }

    // Store in cache for future requests (cache for 30 minutes)
    await redis.set(cacheKey, products, 1800);
    console.log(`✅ Cached featured-products:${amount} for 30 minutes`);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in GetFeaturedProducts:", error);
    next(error);
  }
};
