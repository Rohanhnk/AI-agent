import type { AIMessage } from '../types'
import { addMessages, getMessages } from './memory'
import { runLLM } from './llm'
import { showLoader, logMessage } from './ui'

export const runAgent = async ({
  userMessage,
  tools = [],
}: {
  userMessage: string
  tools?: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])
  const loader = showLoader('Thinking...')
  const history = await getMessages()
  // For Gemini, tools are not used in the same way as OpenAI, so pass an empty array or Gemini-compatible tools
  const response = await runLLM({ messages: history, tools })
  const assistantMessage = {
    role: 'assistant',
    content: response,
  } as import('../types').AIMessage
  await addMessages([assistantMessage])
  logMessage(assistantMessage)
  loader.stop()
  return getMessages()
}
