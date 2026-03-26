export async function geminiGenerate(prompt: string, options: { model?: string, [key: string]: any } = {}) {
  const res = await fetch('/api/ai/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, ...options }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Gemini API error');
  const data = await res.json();
  // Gemini returns candidates[0].content.parts[0].text
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
