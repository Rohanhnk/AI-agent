
import { dadJoke } from './dadJoke';
import { replicateImage } from './replicateImage';
import type { ToolFn } from '../../types';

export const memeFromDadJoke: ToolFn<{}, string> = async (input) => {
  // Step 1: Get a random dad joke
  const joke = await dadJoke({ userMessage: '', toolArgs: {} });
  // Step 2: Generate an image using the joke as the prompt (Replicate)
  const image = await replicateImage({ userMessage: '', toolArgs: { prompt: joke } });
  return image;
};

export const memeFromDadJokeToolDefinition = {
  name: 'meme_from_dad_joke',
  parameters: {},
  description: 'Generate a meme image from a random dad joke.'
};
