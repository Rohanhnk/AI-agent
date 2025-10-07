import { generateImagesToolDefinition } from './generateImage';
import { redditToolDefinition } from './reddit';
import { dadJokeToolDefinition } from './dadJoke';
import { memeFromDadJokeToolDefinition } from './memeFromDadJoke';

export const tools = [
	generateImagesToolDefinition,
	redditToolDefinition,
	dadJokeToolDefinition,
	memeFromDadJokeToolDefinition
]