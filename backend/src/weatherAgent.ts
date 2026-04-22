import { createAgent, tool, initChatModel } from "langchain";
import "dotenv/config";
import * as z from "zod";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set");
}

// Define some tools
const getWeather = tool((input) => `It is always sunny in ${input.city}`, {
  name: "get_weather",
  description: " Get the weather from a city",
  schema: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
});

// Agent Configuration
const SYSTEM_PROMPT = `You are a ai data agent assistant

## Capabilites (Description of what tools you have access to)

getWeather: Get the weather from a given city and return information to 
the user. 

You can also analyze images

`;

const model = await initChatModel("gemini-3.1-pro-preview", {
  modelProvider: "google-genai",
  temperature: 0.5,
  timeout: 600_000,
  maxTokens: 25000,
  apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createAgent({
  model: model,
  systemPrompt: SYSTEM_PROMPT,
  tools: [getWeather],
});

// Uncomment to view response directly
// console.log(
//   await agent.invoke({
//     messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
//   }),
// );
export { agent };
