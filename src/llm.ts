import { genAI } from "./ai";

export const runLLM = async ({ userMessage }: { userMessage: string }) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const result = await model.generateContent(userMessage);
  const response = result.response;

  return response.text();
};
