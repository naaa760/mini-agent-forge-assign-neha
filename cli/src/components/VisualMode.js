"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@reactflow/core";
import { Controls } from "@reactflow/controls";
import { Background } from "@reactflow/background";
import { MiniMap } from "@reactflow/minimap";
import "@reactflow/core/dist/style.css";

import { cn } from "../lib/utils";
import { API_ENDPOINTS } from "../lib/config";

const nodeTypes = {
  promptNode: PromptNode,
  toolNode: ToolNode,
  resultNode: ResultNode,
};

function PromptNode({ data, selected }) {
  return (
    <div
      className={cn(
        "px-6 py-4 shadow-lg rounded-2xl bg-brown-800 border-2 min-w-72 backdrop-blur-sm relative overflow-hidden",
        selected
          ? "border-amber-700/60 ring-3 ring-amber-700/30 shadow-amber-700/20"
          : "border-gray-700/30 hover:border-amber-600/50 hover:shadow-amber-600/15"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-700/5 via-transparent to-amber-800/5"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl mr-3 shadow-md shadow-amber-700/20">
            <span className="text-xl text-white">💭</span>
          </div>
          <div>
            <div
              className="font-bold text-lg text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              AI Prompt
            </div>
            <div
              className="text-xs text-white/80"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Define your instruction
            </div>
          </div>
        </div>
        <div className="relative group">
          <textarea
            value={data.prompt}
            onChange={(e) => data.onPromptChange(e.target.value)}
            placeholder="Enter your AI instruction here..."
            className="w-full p-4 border-2 border-gray-700/30 rounded-xl text-sm resize-none focus:border-amber-700/60 focus:ring-2 focus:ring-amber-700/30 transition-all duration-300 bg-brown-900/60 text-white placeholder:text-beige-400 hover:bg-brown-800/60 group-hover:border-gray-600/40 shadow-inner"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
            rows={3}
            maxLength={1000}
          />
          <div
            className="absolute bottom-2 right-2 text-xs text-white/70 bg-brown-800/80 px-2 py-1 rounded-md"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            {data.prompt?.length || 0}/1000
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-xs text-white/70">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2 animate-pulse shadow-sm shadow-amber-600/40"></div>
            <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Input Node
            </span>
          </div>
          <div
            className="text-xs text-white/70 flex items-center"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            <span>Start here</span>
            <span className="ml-1 animate-pulse">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolNode({ data, selected }) {
  const tools = [
    {
      id: "web-search",
      name: "Web Search",
      icon: "🔍",
      description: "Search the internet",
      color: "amber",
      gradient: "from-amber-700 to-amber-800",
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: "🧮",
      description: "Math calculations",
      color: "amber",
      gradient: "from-amber-800 to-amber-900",
    },
  ];

  return (
    <div
      className={cn(
        "px-6 py-4 shadow-lg rounded-2xl bg-brown-800 border-2 min-w-64 backdrop-blur-sm relative overflow-hidden",
        selected
          ? "border-amber-700/60 ring-3 ring-amber-700/30 shadow-amber-700/20"
          : "border-gray-700/30 hover:border-amber-600/50 hover:shadow-amber-600/15"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-700/5 via-transparent to-amber-800/5"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl mr-3 shadow-md shadow-amber-700/20">
            <span className="text-xl text-white">🛠️</span>
          </div>
          <div>
            <div
              className="font-bold text-lg text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              AI Tool
            </div>
            <div
              className="text-xs text-white/80"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Choose processing method
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => data.onToolChange(tool.id)}
              className={cn(
                "w-full p-3 rounded-xl border-2 text-left transition-all duration-400 group relative overflow-hidden",
                "hover:scale-105",
                data.tool === tool.id
                  ? `border-amber-700/60 bg-gradient-to-br ${tool.gradient} text-white shadow-lg shadow-amber-700/20`
                  : "border-gray-700/30 hover:border-gray-600/40 bg-brown-900/60 hover:bg-brown-800/60 text-white backdrop-blur-sm"
              )}
            >
              <div className="flex items-center relative z-10">
                <span className="text-lg mr-3 transform group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </span>
                <div className="flex-1">
                  <div
                    className="font-semibold text-md mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {tool.name}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      data.tool === tool.id ? "text-white/90" : "text-white/80"
                    )}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {tool.description}
                  </div>
                </div>
                {data.tool === tool.id && (
                  <div className="text-white animate-bounce">
                    <span className="text-lg">✨</span>
                  </div>
                )}
              </div>
              {data.tool !== tool.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-xs text-white/70">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2 animate-pulse shadow-sm shadow-amber-600/40"></div>
            <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Processing Node
            </span>
          </div>
          <div
            className="text-xs text-white/70 flex items-center"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            <span className="animate-pulse">←</span>
            <span className="mx-1">Process</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultNode({ data, selected }) {
  return (
    <div
      className={cn(
        "px-6 py-4 shadow-lg rounded-2xl bg-brown-800 border-2 min-w-72 backdrop-blur-sm relative overflow-hidden",
        selected
          ? "border-amber-700/60 ring-3 ring-amber-700/30 shadow-amber-700/20"
          : "border-gray-700/30 hover:border-amber-600/50 hover:shadow-amber-600/15"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-700/5 via-transparent to-amber-800/5"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-amber-700 to-amber-800 rounded-xl mr-3 shadow-md shadow-amber-700/20">
            <span className="text-xl text-white">📋</span>
          </div>
          <div>
            <div
              className="font-bold text-lg text-white"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              AI Result
            </div>
            <div
              className="text-xs text-white/80"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Generated output
            </div>
          </div>
        </div>
        <div className="bg-brown-900/80 border border-gray-700/20 rounded-xl p-4 max-h-40 overflow-y-auto backdrop-blur-sm shadow-inner">
          {data.result ? (
            <div
              className="text-white text-sm leading-relaxed"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {data.isLoading ? (
                <div className="flex items-center justify-center py-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600 mr-2"></div>
                  <span className="text-white/80">AI is processing...</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap font-sans bg-brown-800/50 p-3 rounded-lg border border-gray-700/20">
                  {data.result}
                </pre>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-xl mb-2 opacity-50">⏳</div>
              <div className="text-white/70 text-xs italic">
                Result will appear here after execution
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center text-xs text-white/70">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2 animate-pulse shadow-sm shadow-amber-600/40"></div>
            <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Output Node
            </span>
          </div>
          <div
            className="text-xs text-white/70 flex items-center"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            <span className="animate-pulse">←</span>
            <span className="mx-1">End result</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisualMode() {
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState("web-search");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const initialNodes = [
    {
      id: "prompt-1",
      type: "promptNode",
      position: { x: 80, y: 80 },
      data: {
        prompt,
        onPromptChange: setPrompt,
      },
    },
    {
      id: "tool-1",
      type: "toolNode",
      position: { x: 400, y: 80 },
      data: {
        tool,
        onToolChange: setTool,
      },
    },
    {
      id: "result-1",
      type: "resultNode",
      position: { x: 720, y: 80 },
      data: {
        result,
        isLoading,
        error,
      },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "prompt-1",
      target: "tool-1",
      animated: true,
      style: { stroke: "#b45309", strokeWidth: 2 },
    },
    {
      id: "e2-3",
      source: "tool-1",
      target: "result-1",
      animated: true,
      style: { stroke: "#92400e", strokeWidth: 2 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const runFlow = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult("");

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
      setResult(data.result);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Update nodes when data changes
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "prompt-1") {
          return {
            ...node,
            data: { ...node.data, prompt, onPromptChange: setPrompt },
          };
        }
        if (node.id === "tool-1") {
          return {
            ...node,
            data: { ...node.data, tool, onToolChange: setTool },
          };
        }
        if (node.id === "result-1") {
          return {
            ...node,
            data: { ...node.data, result, isLoading, error },
          };
        }
        return node;
      })
    );
  }, [prompt, tool, result, isLoading, error, setNodes]);

  return (
    <div className="bg-black p-6 rounded-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-brown-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-2xl font-bold text-white flex items-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <span className="mr-3 text-3xl animate-pulse">🎨</span>
                Visual AI Workflow
              </h2>
              <p
                className="text-white/80 mt-1 text-md"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Build and visualize your AI agent pipeline with drag-and-drop
                nodes
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-amber-700/10 backdrop-blur-sm rounded-full px-3 py-2 border border-amber-700/20">
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse shadow-lg shadow-amber-600/40"></div>
                <span
                  className="text-white font-medium text-sm"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Flow Ready
                </span>
              </div>
              <button
                onClick={runFlow}
                disabled={isLoading || !prompt.trim()}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold text-md transition-all duration-400",
                  "flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95",
                  isLoading || !prompt.trim()
                    ? "bg-brown-600 text-beige-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white shadow-amber-700/20 hover:shadow-amber-700/30 relative overflow-hidden"
                )}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {!isLoading && !prompt.trim() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                )}
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl animate-pulse">▶️</span>
                    <span>Execute Flow</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Visual Flow */}
        <div
          className="bg-brown-900/90 border border-gray-700/20 rounded-xl p-4 shadow-xl backdrop-blur-sm"
          style={{ height: "550px" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            className="bg-brown-900"
            style={{
              background:
                "linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)",
            }}
          >
            <Background
              color="#57534e"
              gap={20}
              size={1}
              style={{ opacity: 0.2 }}
            />
            <Controls className="bg-brown-800/90 border border-gray-700/20 rounded-lg shadow-lg backdrop-blur-sm" />
            <MiniMap
              nodeColor="#78716c"
              maskColor="rgba(28, 25, 23, 0.8)"
              className="bg-brown-800/90 border border-gray-700/20 rounded-lg shadow-lg backdrop-blur-sm"
            />
          </ReactFlow>
        </div>

        {/* Instructions */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-brown-800/80 border border-gray-700/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3 transform group-hover:scale-110 transition-transform duration-300">
                1️⃣
              </span>
              <h3
                className="font-bold text-lg text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Enter Prompt
              </h3>
            </div>
            <p
              className="text-white/80 text-sm leading-relaxed"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Click on the brown prompt node and enter your AI instruction in
              the text area to get started.
            </p>
          </div>

          <div className="p-6 bg-brown-800/80 border border-gray-700/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3 transform group-hover:scale-110 transition-transform duration-300">
                2️⃣
              </span>
              <h3
                className="font-bold text-lg text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Select Tool
              </h3>
            </div>
            <p
              className="text-white/80 text-sm leading-relaxed"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Choose your processing method in the amber tool node - Web Search
              or Calculator.
            </p>
          </div>

          <div className="p-6 bg-brown-800/80 border border-gray-700/20 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3 transform group-hover:scale-110 transition-transform duration-300">
                3️⃣
              </span>
              <h3
                className="font-bold text-lg text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Execute Flow
              </h3>
            </div>
            <p
              className="text-white/80 text-sm leading-relaxed"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Click &quot;Execute Flow&quot; to run your AI agent and see
              results in the output node.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
