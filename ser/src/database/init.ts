import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_OIHZWylG6x5v@ep-nameless-truth-a8su5bem-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export async function initDatabase(): Promise<void> {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS runs (
        id VARCHAR(255) PRIMARY KEY,
        timestamp TIMESTAMP NOT NULL,
        prompt TEXT NOT NULL,
        tool VARCHAR(50) NOT NULL,
        tool_result TEXT NOT NULL,
        llm_response TEXT NOT NULL,
        llm_tokens INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_runs_timestamp ON runs(timestamp);
      CREATE INDEX IF NOT EXISTS idx_runs_tool ON runs(tool);
    `;

    await pool.query(createTableQuery);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}
