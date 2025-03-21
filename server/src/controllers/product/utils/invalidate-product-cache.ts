import redis from "../../../utils/redis";

export const invalidateAllProductCaches = async (
  productId: string,
  slug: string
): Promise<void> => {
  try {
    const idCacheKey = `product:${productId}`;
    const slugCacheKey = `product:slug:${slug}`;

    await Promise.all([redis.del(idCacheKey), redis.del(slugCacheKey)]);

    console.log(
      `✅ Invalidated all caches for product:${productId} (slug:${slug})`
    );
  } catch (error) {
    console.error(
      `❌ Error invalidating caches for product:${productId}:`,
      error
    );
  }
};
