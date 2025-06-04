import { Pool } from "pg";
import { redisClient } from "../redis/client";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_OIHZWylG6x5v@ep-nameless-truth-a8su5bem-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export interface RunData {
  id: string;
  timestamp: Date;
  prompt: string;
  tool: string;
  toolResult: string;
  llmResponse: string;
  llmTokens: number;
}

export interface CachedRun {
  id: string;
  timestamp: Date;
  prompt: string;
  tool: string;
  result: string;
}

export async function saveRun(data: RunData): Promise<void> {
  const query = `
    INSERT INTO runs (id, timestamp, prompt, tool, tool_result, llm_response, llm_tokens)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  await pool.query(query, [
    data.id,
    data.timestamp,
    data.prompt,
    data.tool,
    data.toolResult,
    data.llmResponse,
    data.llmTokens,
  ]);
}

export async function cacheRun(userKey: string, run: CachedRun): Promise<void> {
  // Skip Redis in production
  if (process.env.NODE_ENV === "production") {
    console.log("Skipping cache in production (no Redis)");
    return;
  }

  const cacheKey = `user_runs:${userKey}`;

  try {
    // Get existing runs
    const existingRuns = await redisClient.lRange(cacheKey, 0, -1);
    const runs = existingRuns.map((r) => JSON.parse(r));

    // Add new run at the beginning
    runs.unshift(run);

    // Keep only last 10 runs
    const recent10 = runs.slice(0, 10);

    // Clear and repopulate the list
    await redisClient.del(cacheKey);
    if (recent10.length > 0) {
      await redisClient.rPush(
        cacheKey,
        recent10.map((r) => JSON.stringify(r))
      );
    }

    // Set expiration to 1 hour
    await redisClient.expire(cacheKey, 3600);
  } catch (error) {
    console.error("Cache error:", error);
  }
}

export async function getCachedRuns(userKey: string): Promise<CachedRun[]> {
  // Skip Redis in production
  if (process.env.NODE_ENV === "production") {
    return [];
  }

  const cacheKey = `user_runs:${userKey}`;

  try {
    const runs = await redisClient.lRange(cacheKey, 0, -1);
    return runs.map((r) => JSON.parse(r));
  } catch (error) {
    console.error("Get cache error:", error);
    return [];
  }
}
