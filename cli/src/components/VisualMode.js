"use client";

import { useState, useCallback, useRef } from "react";
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
        "px-6 py-5 shadow-lg rounded-2xl bg-gray-700 border-2 min-w-80",
        selected
          ? "border-blue-500 ring-4 ring-blue-500/30"
          : "border-gray-600 hover:border-blue-400"
      )}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mr-3">
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
            className="text-xs text-gray-300"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Define your instruction
          </div>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={data.prompt}
          onChange={(e) => data.onPromptChange(e.target.value)}
          placeholder="Enter your AI instruction here..."
          className="w-full p-4 border-2 border-gray-600 rounded-2xl text-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200 bg-gray-800 text-white placeholder:text-gray-400"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
          rows={4}
          maxLength={1000}
        />
        <div
          className="absolute bottom-2 right-2 text-xs text-gray-400"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {data.prompt?.length || 0}/1000
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
          <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Input Node
          </span>
        </div>
        <div
          className="text-xs text-gray-400"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          Start here →
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
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: "🧮",
      description: "Math calculations",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div
      className={cn(
        "px-6 py-5 shadow-lg rounded-2xl bg-gray-700 border-2 min-w-72",
        selected
          ? "border-purple-500 ring-4 ring-purple-500/30"
          : "border-gray-600 hover:border-purple-400"
      )}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mr-3">
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
            className="text-xs text-gray-300"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Choose processing method
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => data.onToolChange(tool.id)}
            className={cn(
              "w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 group",
              "hover:scale-105",
              data.tool === tool.id
                ? `border-${tool.color}-500 bg-gradient-to-br ${tool.gradient} text-white shadow-lg`
                : "border-gray-600 hover:border-gray-500 bg-gray-800 hover:bg-gray-600 text-white"
            )}
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">{tool.icon}</span>
              <div className="flex-1">
                <div
                  className={cn(
                    "font-semibold",
                    data.tool === tool.id ? "text-white" : "text-white"
                  )}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {tool.name}
                </div>
                <div
                  className={cn(
                    "text-xs",
                    data.tool === tool.id ? "text-white/80" : "text-gray-300"
                  )}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {tool.description}
                </div>
              </div>
              {data.tool === tool.id && (
                <div className="text-white">
                  <span className="text-sm">✓</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-400">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
          <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Processing Node
          </span>
        </div>
        <div
          className="text-xs text-gray-400"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          ← Process →
        </div>
      </div>
    </div>
  );
}

function ResultNode({ data, selected }) {
  return (
    <div
      className={cn(
        "px-6 py-5 shadow-lg rounded-2xl bg-gray-700 border-2 min-w-80",
        selected
          ? "border-green-500 ring-4 ring-green-500/30"
          : "border-gray-600 hover:border-green-400"
      )}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mr-3">
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
            className="text-xs text-gray-300"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Generated output
          </div>
        </div>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-2xl p-4 max-h-48 overflow-y-auto">
        {data.result ? (
          <div
            className="text-white text-sm leading-relaxed"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {data.isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                <span className="text-gray-300">Processing...</span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap font-sans">{data.result}</pre>
            )}
          </div>
        ) : (
          <div className="text-gray-400 text-sm italic text-center py-4">
            Result will appear here after execution
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Output Node
          </span>
        </div>
        <div
          className="text-xs text-gray-400"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          ← End result
        </div>
      </div>
    </div>
  );
}

const initialNodes = [
  {
    id: "prompt-1",
    type: "promptNode",
    position: { x: 100, y: 100 },
    data: {
      prompt: "",
      onPromptChange: () => {},
    },
  },
  {
    id: "tool-1",
    type: "toolNode",
    position: { x: 500, y: 100 },
    data: {
      tool: "web-search",
      onToolChange: () => {},
    },
  },
  {
    id: "result-1",
    type: "resultNode",
    position: { x: 900, y: 100 },
    data: {
      result: "",
      isLoading: false,
      error: "",
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "prompt-1",
    target: "tool-1",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "e2-3",
    source: "tool-1",
    target: "result-1",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
  },
];

export default function VisualMode() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState("web-search");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Update node data when prompt/tool changes
  const updateNodeData = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    },
    [setNodes]
  );

  // Set up node callbacks
  const onPromptChange = useCallback(
    (newPrompt) => {
      setPrompt(newPrompt);
      updateNodeData("prompt-1", { prompt: newPrompt });
    },
    [updateNodeData]
  );

  const onToolChange = useCallback(
    (newTool) => {
      setTool(newTool);
      updateNodeData("tool-1", { tool: newTool });
    },
    [updateNodeData]
  );

  // Initialize node callbacks
  useState(() => {
    updateNodeData("prompt-1", { onPromptChange });
    updateNodeData("tool-1", { onToolChange, tool });
  });

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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-2xl font-bold text-white flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <span className="mr-3 text-3xl">🎨</span>
              Visual AI Workflow
            </h2>
            <p
              className="text-gray-300 mt-1"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Build and visualize your AI agent pipeline with drag-and-drop
              nodes
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Flow Ready
              </span>
            </div>
            <button
              onClick={runFlow}
              disabled={isLoading || !prompt.trim()}
              className={cn(
                "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                "flex items-center space-x-2",
                isLoading || !prompt.trim()
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
              )}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">▶️</span>
                  <span>Execute Flow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Flow */}
        <div
          className="bg-gray-900 border border-gray-700 rounded-2xl p-4"
          style={{ height: "600px" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            className="bg-gray-900"
            style={{ background: "#111827" }}
          >
            <Background color="#374151" gap={20} />
            <Controls className="bg-gray-800 border border-gray-600" />
            <MiniMap
              nodeColor="#6b7280"
              maskColor="rgba(17, 24, 39, 0.8)"
              className="bg-gray-800 border border-gray-600"
            />
          </ReactFlow>
        </div>

        {/* Instructions */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-gray-700 border border-gray-600 rounded-xl">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">1️⃣</span>
              <h3
                className="font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Enter Prompt
              </h3>
            </div>
            <p
              className="text-gray-300 text-sm"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Click on the blue prompt node and enter your AI instruction in the
              text area.
            </p>
          </div>

          <div className="p-6 bg-gray-700 border border-gray-600 rounded-xl">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">2️⃣</span>
              <h3
                className="font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Select Tool
              </h3>
            </div>
            <p
              className="text-gray-300 text-sm"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Choose your processing method in the purple tool node (Web Search
              or Calculator).
            </p>
          </div>

          <div className="p-6 bg-gray-700 border border-gray-600 rounded-xl">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">3️⃣</span>
              <h3
                className="font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Execute Flow
              </h3>
            </div>
            <p
              className="text-gray-300 text-sm"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Click "Execute Flow" to run your AI agent and see results in the
              green output node.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
