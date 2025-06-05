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
      color: "lime",
      gradient: "from-lime-500 to-lime-600",
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: "🧮",
      description: "Solve mathematical problems",
      color: "lime",
      gradient: "from-lime-600 to-lime-700",
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
    <div className="bg-black p-6 rounded-lg">
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main Form - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className="text-xl font-bold text-white flex items-center"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <span className="mr-2 text-2xl">🤖</span>
                  AI Agent Console
                </h2>
                <p
                  className="text-white text-sm mt-1"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Create intelligent prompts and select tools to execute tasks
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-xs text-white">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full mr-1"></div>
                  <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Prompt Input */}
            <div className="mb-6">
              <label
                htmlFor="prompt"
                className="block text-md font-semibold text-white mb-3 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-lg">💭</span>
                Your AI Instruction
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 border-2 border-brown-600 rounded-xl transition-all duration-300 resize-none",
                    "focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500",
                    "placeholder:text-beige-400 text-white text-md leading-relaxed",
                    "bg-brown-800",
                    "hover:bg-brown-700"
                  )}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                  rows={3}
                  placeholder="Describe what you'd like me to help you with..."
                  maxLength={1000}
                  required
                />
                <div
                  className="absolute bottom-2 right-2 text-xs text-white"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {prompt.length}/1000
                </div>
              </div>
            </div>

            {/* Tool Selection */}
            <div className="mb-6">
              <label
                className="block text-md font-semibold text-white mb-3 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-lg">🛠️</span>
                Select AI Tool
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {tools.map((toolItem) => (
                  <button
                    key={toolItem.id}
                    type="button"
                    onClick={() => setTool(toolItem.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all duration-300 group relative overflow-hidden",
                      "hover:scale-105",
                      tool === toolItem.id
                        ? `border-lime-400 bg-gradient-to-br ${toolItem.gradient} text-white shadow-lg`
                        : "border-brown-600 hover:border-beige-500 bg-brown-800 hover:bg-brown-700 text-white"
                    )}
                  >
                    <div className="flex items-center relative z-10">
                      <span className="text-xl mr-3">{toolItem.icon}</span>
                      <div className="flex-1">
                        <div
                          className="font-bold text-md mb-1"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          {toolItem.name}
                        </div>
                        <div
                          className={cn(
                            "text-sm",
                            tool === toolItem.id
                              ? "text-white/90"
                              : "text-white"
                          )}
                          style={{ fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {toolItem.description}
                        </div>
                      </div>
                      {tool === toolItem.id && (
                        <div className="text-white ml-3">
                          <span className="text-lg">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Example Prompts */}
            <div className="mb-6">
              <label
                className="block text-md font-semibold text-white mb-3 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-lg">💡</span>
                Quick Start Examples
              </label>
              <div className="grid md:grid-cols-2 gap-2">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setPrompt(example.text);
                      setTool(example.tool);
                    }}
                    className="p-3 rounded-lg border border-brown-600 text-left hover:border-beige-500 hover:bg-brown-700 transition-all duration-200 group bg-brown-800"
                  >
                    <div className="flex items-center">
                      <span className="text-md mr-2">{example.icon}</span>
                      <span
                        className="text-white text-sm group-hover:text-lime-300 transition-colors"
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
                "w-full py-3 px-6 rounded-xl font-bold text-md transition-all duration-300",
                "flex items-center justify-center space-x-2",
                isLoading || !prompt.trim()
                  ? "bg-brown-600 text-beige-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-black shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              )}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🚀</span>
                  <span>Run AI Agent</span>
                </>
              )}
            </button>
          </form>

          {/* Results Section */}
          {(result || streamingText || error) && (
            <div className="p-6">
              <h3
                className="text-lg font-bold text-white mb-3 flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-2 text-xl">📋</span>
                Result
              </h3>
              <div className="bg-brown-800 border border-brown-600 rounded-xl p-4">
                {error ? (
                  <div className="text-white">
                    <div className="flex items-center mb-2">
                      <span className="text-md mr-2">❌</span>
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
                    <div className="flex items-center mb-3">
                      <span className="text-md mr-2">✨</span>
                      <span
                        className="font-semibold"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        AI Response
                      </span>
                      {isLoading && (
                        <div className="ml-2 animate-pulse">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="prose max-w-none text-white leading-relaxed"
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
        <div className="space-y-3">
          <div className="p-4">
            <h3
              className="text-md font-bold text-white mb-3 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="mr-2 text-lg">📜</span>
              Recent History
            </h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {history.length === 0 ? (
                <p
                  className="text-white text-sm italic"
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
                    className="w-full p-3 rounded-lg border border-brown-600 text-left hover:border-beige-500 hover:bg-brown-700 transition-all duration-200 group bg-brown-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          run.status === "completed"
                            ? "bg-lime-500/20 text-lime-400"
                            : run.status === "error"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-beige-500/20 text-beige-400"
                        )}
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {run.status}
                      </span>
                      <span
                        className="text-xs text-white"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {run.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p
                      className="text-white text-sm line-clamp-2 group-hover:text-lime-300 transition-colors"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {run.prompt}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-white">
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
