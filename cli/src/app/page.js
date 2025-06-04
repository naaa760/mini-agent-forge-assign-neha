"use client";

import { useState } from "react";
import SimpleMode from "../components/SimpleMode";
import VisualMode from "../components/VisualMode";

export default function Home() {
  const [activeTab, setActiveTab] = useState("simple");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            🤖 Agent Runner
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Craft prompts, select tools, and watch AI work its magic
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              <button
                onClick={() => setActiveTab("simple")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "simple"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                📝 Simple Mode
              </button>
              <button
                onClick={() => setActiveTab("visual")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "visual"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                🎨 Visual Flow
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === "simple" ? <SimpleMode /> : <VisualMode />}
        </div>

        {/* Status Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500 bg-white/30 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Backend Ready
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Neon PostgreSQL
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              Redis Cache
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              Groq LLM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
