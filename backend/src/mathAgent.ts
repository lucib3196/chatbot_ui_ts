import { z } from "zod";
import { tool,createAgent,initChatModel } from "langchain";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set");
}


const realNumberCalculator = tool(({ a, b, operation }) => {
    if (operation === "add") {
        return a + b;
    } else if (operation === "subtract") {
        return a - b;
    } else if (operation === "multiply") {
        return a * b;
    } else if (operation === "divide") {
        if (b === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        return a / b;
    } else {
        throw new Error(`Invalid operation: ${operation}`);
    }
}, {
    name: "real_number_calculator",
    description: "Perform basic arithmetic operations on two real numbers.",
    schema: z.object({
        a: z.number(),
        b: z.number(),
        operation: z.enum(["add", "subtract", "multiply", "divide"])
    })
});

const model = await initChatModel("gemini-3.1-pro-preview", {
  modelProvider: "google-genai",
  temperature: 0.5,
  timeout: 600_000,
  maxTokens: 25000,
  apiKey: process.env.GOOGLE_API_KEY,
});


const agent = createAgent({
    model: model,
    tools: [realNumberCalculator],
    systemPrompt: "You are a helpful assistant."
});

export { agent };