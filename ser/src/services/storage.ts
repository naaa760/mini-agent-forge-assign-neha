import { Pool } from "pg";
// import { redisClient } from "../redis/client"; // DISABLED FOR PRODUCTION

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
  // REDIS COMPLETELY DISABLED FOR PRODUCTION
  console.log("Skipping cache - Redis disabled for production deployment");
  return;
}

export async function getCachedRuns(userKey: string): Promise<CachedRun[]> {
  // REDIS COMPLETELY DISABLED FOR PRODUCTION
  return [];
}
