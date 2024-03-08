/** @format */

import OpenAI from 'openai/index';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
  messages: [{ role: 'user', content: 'Say this is a test' }],
  model: 'gpt-3.5-turbo',
});

export async function generatePrompt(text: string) {}

export async function generateValue(text: string) {}
