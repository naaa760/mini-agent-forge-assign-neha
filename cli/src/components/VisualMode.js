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
        "px-6 py-4 shadow-lg rounded-2xl bg-white border-2 min-w-64",
        selected ? "border-blue-500" : "border-gray-200"
      )}
    >
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">💭</span>
        <div className="font-semibold text-gray-700">Prompt</div>
      </div>
      <textarea
        value={data.prompt}
        onChange={(e) => data.onPromptChange(e.target.value)}
        placeholder="Enter your instruction..."
        className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
        rows={3}
        maxLength={500}
      />
      <div className="text-xs text-gray-500 mt-1 text-right">
        {data.prompt?.length || 0}/500
      </div>
    </div>
  );
}

function ToolNode({ data, selected }) {
  return (
    <div
      className={cn(
        "px-6 py-4 shadow-lg rounded-2xl bg-white border-2 min-w-48",
        selected ? "border-purple-500" : "border-gray-200"
      )}
    >
      <div className="flex items-center mb-3">
        <span className="text-xl mr-2">🛠️</span>
        <div className="font-semibold text-gray-700">Tool</div>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => data.onToolChange("web-search")}
          className={cn(
            "w-full p-3 rounded-xl border text-left transition-all",
            data.tool === "web-search"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-blue-300"
          )}
        >
          <div className="flex items-center">
            <span className="mr-2">🔍</span>
            <span className="font-medium">Web Search</span>
          </div>
        </button>
        <button
          onClick={() => data.onToolChange("calculator")}
          className={cn(
            "w-full p-3 rounded-xl border text-left transition-all",
            data.tool === "calculator"
              ? "border-purple-500 bg-purple-50 text-purple-700"
              : "border-gray-200 hover:border-purple-300"
          )}
        >
          <div className="flex items-center">
            <span className="mr-2">🧮</span>
            <span className="font-medium">Calculator</span>
          </div>
        </button>
      </div>
    </div>
  );
}

function ResultNode({ data, selected }) {
  return (
    <div
      className={cn(
        "px-6 py-4 shadow-lg rounded-2xl bg-white border-2 min-w-64 max-w-80",
        selected ? "border-green-500" : "border-gray-200"
      )}
    >
      <div className="flex items-center mb-2">
        <span className="text-xl mr-2">✨</span>
        <div className="font-semibold text-gray-700">Result</div>
      </div>
      {data.isLoading ? (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Processing...</span>
        </div>
      ) : data.result ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-gray-700 leading-relaxed">{data.result}</p>
        </div>
      ) : data.error ? (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{data.error}</p>
        </div>
      ) : (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">
            Click &quot;Run Flow&quot; to see results
          </p>
        </div>
      )}
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
    position: { x: 450, y: 100 },
    data: {
      tool: "web-search",
      onToolChange: () => {},
    },
  },
  {
    id: "result-1",
    type: "resultNode",
    position: { x: 750, y: 100 },
    data: {
      result: "",
      isLoading: false,
      error: "",
    },
  },
];

const initialEdges = [
  {
    id: "prompt-tool",
    source: "prompt-1",
    target: "tool-1",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "tool-result",
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
  const [isRunning, setIsRunning] = useState(false);

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
      updateNodeData("result-1", {
        error: "Please enter a prompt first",
        result: "",
        isLoading: false,
      });
      return;
    }

    setIsRunning(true);
    updateNodeData("result-1", {
      isLoading: true,
      result: "",
      error: "",
    });

    // Animate edges during execution
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 3 },
      }))
    );

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

      updateNodeData("result-1", {
        result: data.result,
        isLoading: false,
        error: "",
      });
    } catch (err) {
      updateNodeData("result-1", {
        error: err.message || "An error occurred",
        result: "",
        isLoading: false,
      });
    } finally {
      setIsRunning(false);
      // Reset edge animation
      setTimeout(() => {
        setEdges((eds) =>
          eds.map((edge) => ({
            ...edge,
            animated: true,
            style:
              edge.id === "prompt-tool"
                ? { stroke: "#3b82f6", strokeWidth: 2 }
                : { stroke: "#8b5cf6", strokeWidth: 2 },
          }))
        );
      }, 2000);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">🎨</span>
            Visual Flow Builder
          </h2>
          <p className="text-gray-600 mt-1">
            Drag and connect nodes to build your agent workflow
          </p>
        </div>
        <button
          onClick={runFlow}
          disabled={isRunning || !prompt.trim()}
          className={cn(
            "px-6 py-3 rounded-xl font-semibold transition-all duration-200",
            "flex items-center space-x-2",
            isRunning || !prompt.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          )}
        >
          {isRunning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Running...</span>
            </>
          ) : (
            <>
              <span>▶️</span>
              <span>Run Flow</span>
            </>
          )}
        </button>
      </div>

      {/* React Flow Canvas */}
      <div className="h-96 border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#e5e7eb" gap={20} />
          <Controls className="bg-white/80 backdrop-blur-sm" />
          <MiniMap
            className="bg-white/80 backdrop-blur-sm"
            nodeColor={(node) => {
              switch (node.type) {
                case "promptNode":
                  return "#3b82f6";
                case "toolNode":
                  return "#8b5cf6";
                case "resultNode":
                  return "#10b981";
                default:
                  return "#6b7280";
              }
            }}
          />
        </ReactFlow>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-semibold text-blue-800 mb-2">💡 How to use:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Edit the prompt in the first node</li>
          <li>• Select your tool in the middle node</li>
          <li>• Click &quot;Run Flow&quot; to execute and see results</li>
          <li>• Drag nodes around to reorganize your workflow</li>
        </ul>
      </div>
    </div>
  );
}
