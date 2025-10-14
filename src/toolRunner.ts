// Example tool function
const getWeather = () => 'cole,-10deg'

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
    case 'getWeather':
      return getWeather()
    default:
      throw new Error(`Unknown tool: ${toolCall.name}`)
  }
}
