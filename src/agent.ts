import type {AIMessage} from '..types'
import { addMessages, getMessages} from './memory'
import {runLLM} from './llm'
import { showLoader, logMessage } from './ui'

export const runAgent = async ({userMessage}: {userMessage: string}) => {
    await addMessages([{role: 'user', content:userMessage}])
    const loader = showLoader('Thinking...')
    const history = await getMessages()
    const response = await runLLM({messages: history, tools})
    await addMessages([{role: 'assistant', content: response}])

   logMessage(response)
    loader.stop()
return getMessages()
}