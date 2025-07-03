import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// ✅ CORS must be registered BEFORE any routes or middleware
app.use(cors({
  origin: 'https://unemploycoin.com',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// Optional: test endpoint
app.get("/", (req, res) => {
  res.send("🚀 API is live");
});

app.post('/api/ask', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://unemploycoin.com",
        "X-Title": "UnemployCoinChatBot"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          {
          role: "system",
          content: `You are the official assistant for UnemployCoin — a real cryptocurrency created to support unemployed and underbanked individuals through blockchain technology. Your job is to explain the project's mission, timeline, features, and roadmap clearly and professionally. Avoid saying UnemployCoin is fictional or from TV shows — this is a legitimate community project. Use a confident, concise tone and stay fully aligned with UnemployCoin's actual vision, which includes accessibility, empowerment, transparency, and long-term utility.`
          },
          { 
          role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("✅ OpenRouter API response:", JSON.stringify(data, null, 2));
    res.send(data);

    console.log("🌐 Status:", response.status, response.ok);

  } catch (err) {
    console.error("❌ OpenRouter error:", err);
    res.status(500).json({ error: "AI request failed." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
