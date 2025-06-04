"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

export default function SimpleMode() {
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState("web-search");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const [history, setHistory] = useState([]);

  // Simulate streaming effect
  const typeWriter = (text, callback) => {
    setStreamingText("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setStreamingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        callback();
      }
    }, 20);
    return timer;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult("");
    setStreamingText("");

    const currentRun = {
      id: Date.now(),
      prompt,
      tool,
      timestamp: new Date(),
      status: "running",
    };

    setHistory((prev) => [currentRun, ...prev]);

    try {
      const response = await fetch("http://localhost:3001/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, tool }),
      });

      if (!response.ok) {
        throw new Error("Failed to process request");
      }

      const data = await response.json();

      // Simulate streaming effect
      typeWriter(data.result, () => {
        setResult(data.result);
        setHistory((prev) =>
          prev.map((run) =>
            run.id === currentRun.id
              ? { ...run, result: data.result, status: "completed" }
              : run
          )
        );
      });
    } catch (err) {
      const errorMessage = err.message || "An error occurred";
      setError(errorMessage);
      setHistory((prev) =>
        prev.map((run) =>
          run.id === currentRun.id
            ? { ...run, result: errorMessage, status: "error" }
            : run
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Main Form */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              💭 Your Instruction
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={cn(
                "w-full px-4 py-4 border-2 rounded-xl transition-all duration-200 resize-none",
                "focus:ring-4 focus:ring-blue-100 focus:border-blue-500",
                "placeholder:text-gray-400 text-gray-700",
                "bg-white/50 backdrop-blur-sm"
              )}
              rows={5}
              placeholder="What would you like me to help you with? (e.g., 'Search for the latest news about AI' or 'Calculate 15 * 23 + 45')"
              maxLength={500}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {prompt.length}/500 characters
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() =>
                    setPrompt("Search for the latest AI breakthroughs")
                  }
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                >
                  🔍 Try Search
                </button>
                <button
                  type="button"
                  onClick={() => setPrompt("Calculate 15 * 23 + 45")}
                  className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                >
                  🧮 Try Math
                </button>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="tool"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              🛠️ Select Tool
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTool("web-search")}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  tool === "web-search"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-50"
                )}
              >
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-semibold">Web Search</div>
                <div className="text-xs text-gray-500">Search the internet</div>
              </button>
              <button
                type="button"
                onClick={() => setTool("calculator")}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  tool === "calculator"
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 bg-white/50 hover:border-purple-300 hover:bg-purple-50"
                )}
              >
                <div className="text-2xl mb-2">🧮</div>
                <div className="font-semibold">Calculator</div>
                <div className="text-xs text-gray-500">Solve math problems</div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={cn(
              "w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200",
              "flex items-center justify-center space-x-2",
              isLoading || !prompt.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            )}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Run Agent</span>
              </>
            )}
          </button>
        </form>

        {/* Results */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-2">❌</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {(streamingText || result) && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
            <div className="flex items-center mb-3">
              <span className="text-green-500 text-xl mr-2">✅</span>
              <h3 className="text-lg font-semibold text-green-800">Result</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {streamingText || result}
              {isLoading && streamingText && (
                <span className="inline-block w-2 h-5 bg-green-500 ml-1 animate-pulse"></span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* History Sidebar */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">📜</span>
          Recent Runs
        </h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No runs yet. Try submitting a prompt!
            </p>
          ) : (
            history.map((run) => (
              <div
                key={run.id}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-200",
                  run.status === "completed" && "bg-green-50 border-green-200",
                  run.status === "error" && "bg-red-50 border-red-200",
                  run.status === "running" && "bg-blue-50 border-blue-200"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">
                    {run.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                    {run.tool === "web-search" ? "🔍" : "🧮"} {run.tool}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {run.prompt}
                </p>
                {run.result && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {run.result}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
