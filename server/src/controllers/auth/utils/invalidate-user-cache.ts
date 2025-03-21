import redis from "../../../utils/redis";

export const invalidateUserCache = async (userId: string): Promise<void> => {
  try {
    const cacheKey = `user:${userId}`;
    await redis.del(cacheKey);
    console.log(`✅ Invalidated cache for user:${userId}`);
  } catch (error) {
    console.error(`❌ Error invalidating cache for user:${userId}:`, error);
  }
};
