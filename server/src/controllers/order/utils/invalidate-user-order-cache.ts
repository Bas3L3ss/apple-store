import redis from "../../../utils/redis";

export const invalidateUserOrderCaches = async (
  userId: string
): Promise<void> => {
  try {
    // Get all keys matching the user's order pattern
    const keys = await redis.client.keys(`orders:user:${userId}:*`);

    if (keys.length > 0) {
      // Delete all matching keys
      await redis.client.del(...keys);
      console.log(
        `✅ Invalidated ${keys.length} order cache keys for user: ${userId}`
      );
    }
  } catch (error) {
    console.error(
      `❌ Error invalidating order caches for user ${userId}:`,
      error
    );
  }
};
