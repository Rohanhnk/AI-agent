import 'dotenv/config';
import { runLLM } from './src/llm.ts';

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}

(async () => {
  try {
    const response = await runLLM({ userMessage });
    console.log(response);
  } catch (err) {
    console.error('Error running LLM:', err);
  }
})();
