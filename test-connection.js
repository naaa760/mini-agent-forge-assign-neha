// Test script to verify frontend-backend connection
const API_BASE_URL = "http://localhost:3001";

console.log("🧪 Testing API Connection...");
console.log("Frontend should connect to:", API_BASE_URL);

fetch(`${API_BASE_URL}/health`)
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Backend Health Check:", data);

    // Test the calculator
    return fetch(`${API_BASE_URL}/api/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "Calculate 5 + 5", tool: "calculator" }),
    });
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Calculator Test:", data);
  })
  .catch((error) => {
    console.error("❌ Connection Error:", error.message);
  });
