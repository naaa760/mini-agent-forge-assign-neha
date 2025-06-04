import { createClient } from "redis";

// Only create Redis client in development
export const redisClient =
  process.env.NODE_ENV === "production"
    ? null
    : createClient({
        socket: {
          host: process.env.REDIS_HOST || "localhost",
          port: parseInt(process.env.REDIS_PORT || "6379"),
        },
      });

export async function initRedis(): Promise<void> {
  // Skip Redis in production
  if (process.env.NODE_ENV === "production" || !redisClient) {
    console.log("Skipping Redis in production");
    return;
  }

  try {
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis connection error:", error);
    throw error;
  }
}
