import 'dotenv/config';
import {z} from 'zod';
import { runAgent } from './src/agent';

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}

const weatherTool = {
  name: 'get_weather',
  description: 'Get the current weather for a city.',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'Name of the city' }
    },
    required: ['city']
  }
};

const response = await runAgent({ userMessage, tools: [weatherTool] })

console.log(response);
