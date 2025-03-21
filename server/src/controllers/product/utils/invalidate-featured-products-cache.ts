import redis from "../../../utils/redis";

export const invalidateFeaturedProductsCache = async (): Promise<void> => {
  try {
    // Get all keys matching the pattern
    const keys = await redis.client.keys("featured-products:*");

    if (keys.length > 0) {
      // Delete all matching keys
      await redis.client.del(...keys);
      console.log(`✅ Invalidated ${keys.length} featured products cache keys`);
    }
  } catch (error) {
    console.error("❌ Error invalidating featured products cache:", error);
  }
};
