import 'dotenv/config';
import { runAgent } from './src/agent';
import { tools } from './src/tools';
import { memeFromDadJoke } from './src/tools/memeFromDadJoke';

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}

// If the user asks for a meme image from a random dad joke or to generate a dad joke, call the tool directly
if (/meme image.*dad joke/i.test(userMessage) || /generate.*dad joke/i.test(userMessage)) {
  const result = await memeFromDadJoke({ userMessage, toolArgs: {} });
  console.log(result);
} else {
  const messages = await runAgent({ userMessage, tools });
  const assistantReply = messages[messages.length - 1];
  if (assistantReply.role === 'assistant') {
    console.log(assistantReply.content);
  } else {
    console.log('No assistant reply found.');
  }
}
