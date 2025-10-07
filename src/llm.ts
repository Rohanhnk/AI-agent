import type { AIMessage } from '../types'
import { genAI } from './ai'

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const model = genAI.getGenerativeModel({
    model: 'models/gemini-2.5-pro',
  })

  const prompt = messages.map((msg) => `${msg.role}: ${msg.content}`).join('\n')

  const result = await model.generateContent(prompt)
  const response = result.response

  return response.text()
}
