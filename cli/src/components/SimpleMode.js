"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { API_ENDPOINTS } from "../lib/config";

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
      const response = await fetch(API_ENDPOINTS.run, {
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

  const tools = [
    {
      id: "web-search",
      name: "Web Search",
      icon: "🔍",
      description: "Search the internet for information",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: "🧮",
      description: "Solve mathematical problems",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const examplePrompts = [
    {
      text: "Search for the latest AI breakthroughs",
      tool: "web-search",
      icon: "🔍",
    },
    {
      text: "Calculate 15 * 23 + 45",
      tool: "calculator",
      icon: "🧮",
    },
    {
      text: "Find trending news about climate change",
      tool: "web-search",
      icon: "🌍",
    },
    {
      text: "What's the square root of 1024?",
      tool: "calculator",
      icon: "📐",
    },
  ];

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className="text-2xl font-bold text-white flex items-center"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <span className="mr-3 text-3xl">🤖</span>
                  AI Agent Console
                </h2>
                <p
                  className="text-gray-300 mt-1"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Create intelligent prompts and select tools to execute tasks
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Prompt Input */}
            <div className="mb-8">
              <label
                htmlFor="prompt"
                className="block text-lg font-semibold text-white mb-4 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-xl">💭</span>
                Your AI Instruction
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={cn(
                    "w-full px-6 py-4 border-2 border-gray-600 rounded-2xl transition-all duration-300 resize-none",
                    "focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500",
                    "placeholder:text-gray-400 text-white text-lg leading-relaxed",
                    "bg-gray-700",
                    "hover:bg-gray-600"
                  )}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                  rows={4}
                  placeholder="Describe what you'd like me to help you with in detail..."
                  maxLength={1000}
                  required
                />
                <div
                  className="absolute bottom-3 right-3 text-xs text-gray-400"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {prompt.length}/1000
                </div>
              </div>
            </div>

            {/* Tool Selection */}
            <div className="mb-8">
              <label
                className="block text-lg font-semibold text-white mb-4 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-xl">🛠️</span>
                Select AI Tool
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {tools.map((toolItem) => (
                  <button
                    key={toolItem.id}
                    type="button"
                    onClick={() => setTool(toolItem.id)}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left transition-all duration-300 group relative overflow-hidden",
                      "hover:scale-105",
                      tool === toolItem.id
                        ? `border-${toolItem.color}-400 bg-gradient-to-br ${toolItem.gradient} text-white shadow-lg`
                        : "border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600 text-white"
                    )}
                  >
                    <div className="flex items-center relative z-10">
                      <span className="text-2xl mr-4">{toolItem.icon}</span>
                      <div className="flex-1">
                        <div
                          className="font-bold text-lg mb-1"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {toolItem.name}
                        </div>
                        <div
                          className={cn(
                            "text-sm",
                            tool === toolItem.id
                              ? "text-white/90"
                              : "text-gray-300"
                          )}
                          style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {toolItem.description}
                        </div>
                      </div>
                      {tool === toolItem.id && (
                        <div className="text-white ml-4">
                          <span className="text-xl">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Example Prompts */}
            <div className="mb-8">
              <label
                className="block text-lg font-semibold text-white mb-4 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-xl">💡</span>
                Quick Start Examples
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setPrompt(example.text);
                      setTool(example.tool);
                    }}
                    className="p-4 rounded-xl border border-gray-600 text-left hover:border-gray-500 hover:bg-gray-700 transition-all duration-200 group bg-gray-700"
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{example.icon}</span>
                      <span
                        className="text-white text-sm group-hover:text-blue-300 transition-colors"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {example.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={cn(
                "w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300",
                "flex items-center justify-center space-x-3",
                isLoading || !prompt.trim()
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              )}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🚀</span>
                  <span>Run AI Agent</span>
                </>
              )}
            </button>
          </form>

          {/* Results Section */}
          {(result || streamingText || error) && (
            <div className="p-8">
              <h3
                className="text-xl font-bold text-white mb-4 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-2xl">📋</span>
                Result
              </h3>
              <div className="bg-gray-700 border border-gray-600 rounded-2xl p-6">
                {error ? (
                  <div className="text-red-400">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">❌</span>
                      <span
                        className="font-semibold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Error
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      {error}
                    </p>
                  </div>
                ) : (
                  <div className="text-white">
                    <div className="flex items-center mb-4">
                      <span className="text-lg mr-2">✨</span>
                      <span
                        className="font-semibold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        AI Response
                      </span>
                      {isLoading && (
                        <div className="ml-3 animate-pulse">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="prose max-w-none text-gray-200 leading-relaxed"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      <pre className="whitespace-pre-wrap font-sans">
                        {streamingText || result}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* History Sidebar */}
        <div className="space-y-4">
          <div className="p-6">
            <h3
              className="text-lg font-bold text-white mb-4 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="mr-2 text-xl">📜</span>
              Recent History
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <p
                  className="text-gray-400 text-sm italic"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  No history yet. Start by running your first agent!
                </p>
              ) : (
                history.map((run) => (
                  <button
                    key={run.id}
                    onClick={() => {
                      setPrompt(run.prompt);
                      setTool(run.tool);
                    }}
                    className="w-full p-4 rounded-xl border border-gray-600 text-left hover:border-gray-500 hover:bg-gray-700 transition-all duration-200 group bg-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          run.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : run.status === "error"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-blue-500/20 text-blue-400"
                        )}
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {run.status}
                      </span>
                      <span
                        className="text-xs text-gray-400"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {run.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p
                      className="text-white text-sm line-clamp-2 group-hover:text-blue-300 transition-colors"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {run.prompt}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span className="mr-1">
                        {run.tool === "web-search" ? "🔍" : "🧮"}
                      </span>
                      <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        {run.tool}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
