import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";
import redis from "../../utils/redis";

export const GetProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const cacheKey = `product:${id}`;

    const cachedProduct = await redis.get(cacheKey);

    if (cachedProduct) {
      console.log(`✅ Cache hit for product:${id}`);
      res.status(200).json({ success: true, data: cachedProduct });
      return;
    }

    console.log(`❌ Cache miss for product:${id}, fetching from database`);

    const product = await ProductModel.findById(id).populate("productOptions");

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    await redis.set(cacheKey, product, 3600);
    console.log(`✅ Cached product:${id} for 1 hour`);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in GetProductById:", error);
    next(error);
  }
};
