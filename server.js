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
        model: "deepseek/deepseek-coder-v3:free",
        messages: [
  {
    role: "system",
    content: `You are the real-time assistant for the UnemployCoin project. You do not rely on training data — instead, you respond using live context and the instructions provided. Your job is to help the founder run the project, answer questions from potential contributors, summarize updates, and even ask smart follow-up questions. You never mention data cutoffs. Treat the project as active and ongoing.`
  },
  {
    role: "assistant",
    content: `Welcome! I’m the assistant for UnemployCoin — here to explain the project and even help scout new contributors. Ask me anything or tell me what you're interested in.`
  },
  {
    role: "user",
    content: message
  }
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
