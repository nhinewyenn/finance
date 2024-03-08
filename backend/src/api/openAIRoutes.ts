/** @format */

import express, { Response, Request } from 'express';

const router = express.Router();

const API_KEY = 'change this to openai api key';

const options = {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    max_tokens: 100,
  }),
};

router.post('/completion', async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

export default router;
