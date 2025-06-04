import express from "express";
import { z } from "zod";
import { searchTool } from "../tools/search";
import { calculatorTool } from "../tools/calculator";
import { generateLLMResponse } from "../services/llm";
import { saveRun, getCachedRuns, cacheRun } from "../services/storage";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const runSchema = z.object({
  prompt: z.string().min(1).max(500),
  tool: z.enum(["web-search", "calculator"]),
});

router.post("/run", async (req, res) => {
  try {
    // Validate request
    const { prompt, tool } = runSchema.parse(req.body);

    const runId = uuidv4();
    const timestamp = new Date();

    // Execute tool
    let toolResult: string;
    let toolData: any;

    if (tool === "web-search") {
      toolData = await searchTool(prompt);
      toolResult = `Found: "${toolData.title}" - ${toolData.link}`;
    } else {
      toolData = await calculatorTool(prompt);
      toolResult = `Calculation result: ${toolData.result}`;
    }

    // Generate LLM response
    const llmResponse = await generateLLMResponse(prompt, tool, toolResult);

    // Save to database
    await saveRun({
      id: runId,
      timestamp,
      prompt,
      tool,
      toolResult,
      llmResponse: llmResponse.content,
      llmTokens: llmResponse.tokens,
    });

    // Cache for user (using IP as user identifier for simplicity)
    const userKey = req.ip || "anonymous";
    await cacheRun(userKey, {
      id: runId,
      timestamp,
      prompt,
      tool,
      result: llmResponse.content,
    });

    res.json({
      id: runId,
      result: llmResponse.content,
      tool,
      timestamp,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Invalid request", details: error.errors });
    }

    console.error("Run error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

router.get("/runs", async (req, res) => {
  try {
    const userKey = req.ip || "anonymous";
    const cachedRuns = await getCachedRuns(userKey);
    res.json(cachedRuns);
  } catch (error) {
    console.error("Get runs error:", error);
    res.status(500).json({ error: "Failed to get runs" });
  }
});

export { router as runRouter };
