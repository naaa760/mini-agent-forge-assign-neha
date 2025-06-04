import request from "supertest";
import express from "express";
import { runRouter } from "../routes/run";

// Mock the dependencies
jest.mock("../tools/search");
jest.mock("../tools/calculator");
jest.mock("../services/llm");
jest.mock("../services/storage");

const app = express();
app.use(express.json());
app.use("/api", runRouter);

describe("POST /api/run", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should validate request schema", async () => {
    const response = await request(app).post("/api/run").send({
      prompt: "", // Empty prompt should fail
      tool: "invalid-tool", // Invalid tool should fail
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid request");
  });

  test("should reject prompt longer than 500 characters", async () => {
    const longPrompt = "a".repeat(501);

    const response = await request(app).post("/api/run").send({
      prompt: longPrompt,
      tool: "web-search",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid request");
  });

  test("should accept valid web-search request", async () => {
    // Mock the modules
    const { searchTool } = require("../tools/search");
    const { generateLLMResponse } = require("../services/llm");
    const { saveRun, cacheRun } = require("../services/storage");

    searchTool.mockResolvedValue({
      title: "Test Result",
      link: "https://example.com",
    });

    generateLLMResponse.mockResolvedValue({
      content: "Based on my search, here's what I found: Test Result",
      tokens: 25,
    });

    saveRun.mockResolvedValue(undefined);
    cacheRun.mockResolvedValue(undefined);

    const response = await request(app).post("/api/run").send({
      prompt: "Search for AI news",
      tool: "web-search",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("result");
    expect(response.body.tool).toBe("web-search");
  });

  test("should accept valid calculator request", async () => {
    // Mock the modules
    const { calculatorTool } = require("../tools/calculator");
    const { generateLLMResponse } = require("../services/llm");
    const { saveRun, cacheRun } = require("../services/storage");

    calculatorTool.mockResolvedValue({
      result: 42,
    });

    generateLLMResponse.mockResolvedValue({
      content: "The answer to your calculation is: 42",
      tokens: 15,
    });

    saveRun.mockResolvedValue(undefined);
    cacheRun.mockResolvedValue(undefined);

    const response = await request(app).post("/api/run").send({
      prompt: "Calculate 6 * 7",
      tool: "calculator",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("result");
    expect(response.body.tool).toBe("calculator");
  });
});
