import { Router } from 'express';
import Groq from 'groq-sdk';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', authMiddleware, async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'El campo text es requerido' });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: text }],
    });

    const reply = completion.choices[0]?.message?.content ?? '';
    res.json({ reply });
  } catch (err) {
    console.error('Groq error:', err.message);
    res.status(502).json({ error: 'Error al contactar el LLM' });
  }
});

export default router;
