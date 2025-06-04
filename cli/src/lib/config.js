// Smart environment detection for both development and production
const isClient = typeof window !== "undefined";
const isDevelopment = isClient
  ? window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  : process.env.NODE_ENV !== "production";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (isDevelopment
    ? "http://localhost:3001"
    : "https://mini-agent-forge-assign-neha.vercel.app/"); // Replace with actual URL when deploying

export const API_ENDPOINTS = {
  run: `${API_BASE_URL}/api/run`,
  runs: `${API_BASE_URL}/api/runs`,
  health: `${API_BASE_URL}/health`,
};
