import 'dotenv/config';
import { runAgent } from './src/agent';
import {tools} from './src/tools'

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}




const messages = await runAgent({ userMessage, tools})
const assistantReply = messages[messages.length - 1]
if (assistantReply.role === 'assistant') {
  console.log(assistantReply.content)
} else {
  console.log('No assistant reply found.')
}
