import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { prompt, model = 'gemini-pro', ...rest } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt required' });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Gemini API key not set' });
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], ...rest }),
    });
    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Gemini API error' });
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal error' });
  }
}
