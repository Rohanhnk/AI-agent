// Example tool function
// Example tool function
import { generateImage, generateImagesToolDefinition } from './tools/generateImage';
import { reddit, redditToolDefinition } from './tools/reddit';
import { dadJoke, dadJokeToolDefinition } from './tools/dadJoke';

// Gemini-compatible tool call structure: { name: string, arguments: string }
export const runTool = async (
  toolCall: { name: string; arguments: string },
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: toolCall.arguments ? JSON.parse(toolCall.arguments) : {},
  }

  switch (toolCall.name) {
    case generateImagesToolDefinition.name:
      return generateImage(input);
    case redditToolDefinition.name:
      return reddit(input);
    case dadJokeToolDefinition.name:
      return dadJoke(input);
    default:
      return `Never run this tool: ${toolCall.name} again, or else!`;
  }
}
