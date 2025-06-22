import type { AIMessage } from "../types";
import { genAI } from "./ai";

export const runLLM = async ({ messages }: { messages: AIMessage[] }) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

 const prompt = messages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join("\n");
 
  const result = await model.generateContent(prompt);
  const response = result.response;

  return response.text();
};
 