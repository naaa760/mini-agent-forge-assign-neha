export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://your-backend-app.vercel.app" // Replace with your actual backend URL
    : "http://localhost:3001");

export const API_ENDPOINTS = {
  run: `${API_BASE_URL}/api/run`,
  runs: `${API_BASE_URL}/api/runs`,
  health: `${API_BASE_URL}/health`,
};
