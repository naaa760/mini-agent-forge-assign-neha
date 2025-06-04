import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { runRouter } from "./routes/run";
import { initDatabase } from "./database/init";
import { initRedis } from "./redis/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://mini-agent-forge-assign-neha.vercel.app",
            /\.vercel\.app$/,
            /\.render\.com$/,
          ]
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api", runRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
);

// Initialize database and Redis, then start server
async function startServer() {
  try {
    await initDatabase();

    // Skip Redis in production if not available
    if (process.env.NODE_ENV !== "production") {
      await initRedis();
    } else {
      console.log("Skipping Redis in production");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// For local development
if (process.env.NODE_ENV !== "production") {
  startServer();
}

// Export for Vercel
export default app;
