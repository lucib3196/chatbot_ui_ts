export const AGENT_SERVER_URL =
  import.meta.env.VITE_API_URL || "http://localhost:2024";

// Must map to actual agent name found in langgraph.json
export type ChatSlug = "weather" | "math";
type AssistantId = "my_weather_agent" | "math_agent";

type ChatConfiguration = {
  assistantId: AssistantId;
  name: string;
  description: string;
};

export const SLUG_TO_ASSISTANT: Record<ChatSlug, ChatConfiguration> = {
  weather: {
    assistantId: "my_weather_agent",
    name: "Weather",
    description: "Returns mock weather values for a requested location.",
  },
  math: {
    assistantId: "math_agent",
    name: "Math",
    description: "Performs arithmetic operations from your prompt.",
  },
};
