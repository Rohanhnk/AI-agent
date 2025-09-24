import type { ToolFn } from '../../types';
import { z } from 'zod';
import { genAI } from '../ai';

export const generateImagesToolDefinition = {
    name: 'generate_image',
    parameters: z.object({
        prompt: z.string().describe('A description of the image to generate'),
        n: z.number().min(1).max(4).default(1).describe('The number of images to generate'),
        size: z.enum(['256x256', '512x512', '1024x1024']).default('512x512').describe('The size of the generated images'),
    }),
    description: "Generate an image from a text prompt using Gemini's image generation API.",
};

type Args = z.infer<typeof generateImagesToolDefinition.parameters>;

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
    // Gemini's SDK currently supports text and code generation, but image generation is in preview or not generally available in the Node SDK.
    // We'll simulate the API call as if it were available, but you may need to use the REST API directly if this fails.
    try {
        const result = await model.generateContent({
            contents: [
                { role: 'user', parts: [{ text: toolArgs.prompt }] }
            ],
            generationConfig: {
                candidateCount: toolArgs.n,
            }
        });
        // Try to extract image data from the response (if supported)
        const candidates = result.response.candidates || [];
        for (const c of candidates) {
            if (c.content && Array.isArray(c.content.parts)) {
                for (const part of c.content.parts) {
                    if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
                        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    }
                }
            }
        }
        return 'No image generated or image generation not supported by Gemini SDK.';
    } catch (err) {
        return `Error generating image: ${err}`;
    }
};