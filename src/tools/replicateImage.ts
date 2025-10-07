import fetch from 'node-fetch';
import { z } from 'zod';
import type { ToolFn } from '../../types';

export const replicateImageToolDefinition = {
  name: 'replicate_image',
  parameters: z.object({
    prompt: z.string().describe('A description of the image to generate'),
  }),
  description: 'Generate an image from a text prompt using Replicate Stable Diffusion API.'
};

type Args = z.infer<typeof replicateImageToolDefinition.parameters>;

export const replicateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) return 'Replicate API token not set.';

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  version: 'YOUR_NEW_VERSION_ID_HERE', // Stable Diffusion latest version from Replicate
      input: { prompt: toolArgs.prompt }
    })
  });

  if (!response.ok) {
    return `Replicate API error: ${response.statusText}`;
  }

  const prediction = await response.json();

  // Poll for completion
  let outputUrl = '';
  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await new Promise(res => setTimeout(res, 2000));
    const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
      headers: { 'Authorization': `Token ${apiToken}` }
    });
    const pollData = await pollRes.json();
    if (pollData.status === 'succeeded') {
      outputUrl = pollData.output[0];
      break;
    } else if (pollData.status === 'failed') {
      return 'Image generation failed.';
    }
  }

  return outputUrl ? `Here is your image: ${outputUrl}` : 'Image generation did not return a result.';
};
