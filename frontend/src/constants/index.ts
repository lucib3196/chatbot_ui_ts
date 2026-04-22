export const AGENT_SERVER_URL =
  import.meta.env.VITE_API_URL || "http://localhost:2024";

// Must map to actual agent name found in langgraph.json
export const SLUG_TO_ASSISTANT: Record<string, string> = {
  weather: "my_weather_agent",
  math: "math_agent",
};
