"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState("web-search");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult("");

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
      setResult(data.result);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 Agent Runner
          </h1>
          <p className="text-lg text-gray-600">
            Craft a prompt, select a tool, and watch AI work its magic
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Instruction
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="What would you like me to help you with? (e.g., 'Search for the latest news about AI' or 'Calculate 15 * 23 + 45')"
                maxLength={500}
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {prompt.length}/500 characters
              </div>
            </div>

            <div>
              <label
                htmlFor="tool"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Tool
              </label>
              <select
                id="tool"
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="web-search">🔍 Web Search</option>
                <option value="calculator">🧮 Calculator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "🚀 Run Agent"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Result
              </h3>
              <p className="text-green-700 leading-relaxed">{result}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Backend Ready
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              PostgreSQL
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              Redis Cache
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
