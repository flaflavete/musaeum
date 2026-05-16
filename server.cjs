require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app      = express();
const PORT     = 3001;
const VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam
const MODEL    = 'eleven_multilingual_v2';

app.use(cors());
app.use(express.json());

app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text obrigatório' });

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key':   process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id:       MODEL,
          voice_settings: { stability: 0.45, similarity_boost: 0.80 },
        }),
      }
    );

    if (!upstream.ok) {
      const err = await upstream.text().catch(() => '');
      return res.status(upstream.status).json({ error: err });
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    const buffer = await upstream.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy TTS rodando em http://localhost:${PORT}`)
);
