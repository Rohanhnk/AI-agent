import { addMessages, getMessages } from './src/memory.ts';
import { runLLM } from './src/llm.ts';

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}

await addMessages([{ role: 'user', content: userMessage }]);
const messages = await getMessages(); 
const response = await runLLM({ messages }); 

console.log(response);
