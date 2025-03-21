import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../../models/Order";
import redis from "../../utils/redis";

export const GetOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.auth;
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "User authentication required" });
      return;
    }

    // Pagination parameters
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);

    // Create a cache key based on user ID and pagination
    const cacheKey = `orders:user:${user._id}:page:${page}:limit:${limit}`;

    // Try to get orders from cache first
    const cachedResult = await redis.get(cacheKey);

    if (cachedResult) {
      console.log(`✅ Cache hit for ${cacheKey}`);
      res.status(200).json(cachedResult);
      return;
    }

    console.log(`❌ Cache miss for ${cacheKey}, fetching from database`);

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Fetch orders with pagination
    const orders = await OrderModel.find({ userId: user._id })
      .skip(skip)
      .limit(limit);
    const totalOrders = await OrderModel.countDocuments({ userId: user._id });

    const result = {
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
      },
    };

    // Store in cache for future requests (cache for 5 minutes)
    // Short TTL for orders since they change frequently
    await redis.set(cacheKey, result, 300);
    console.log(`✅ Cached ${cacheKey} for 5 minutes`);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in GetOrders:", error);
    next(error);
  }
};
