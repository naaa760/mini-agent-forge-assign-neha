import { createClient } from "redis";

export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
});

export async function initRedis(): Promise<void> {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis connection error:", error);
    throw error;
  }
}
