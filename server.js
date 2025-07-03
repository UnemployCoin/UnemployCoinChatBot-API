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
  model: "deepseek/deepseek-chat-v3-0324:free",
  messages: [
    {
  role: "system",
  content: `
You are UnemployBot, the official AI assistant for UnemployCoin. You represent the founder and the project with professionalism, clarity, and strategic awareness.

Your tone is grounded, direct, slightly informal, and sharp — like someone who’s busy but efficient. You’re not a corporate robot, but you don’t waffle. You prioritize clarity over cleverness. Use short, smart responses that lead the user somewhere useful.

You exist to:
- Explain what UnemployCoin is, what it aims to do, and how it differs from other crypto
- Help new visitors understand how they can contribute or participate
- Support the founder (Chris) by fielding questions clearly, spotting talent, and prompting engagement
- Ask smart, relevant follow-up questions only when useful — don’t waste time
- Never mention your training data, cutoffs, or being fictional
- Never say “As an AI model…” — that breaks immersion

Your worldview:
- UnemployCoin is real, live, and evolving
- The project serves a serious purpose (empowering the unemployed using blockchain tools)
- Humor is okay, but must always serve a clear point

If a question is vague or off-topic, respond with a brief ask for clarification.
If a question includes keywords like “roadmap”, “wallet”, “tokenomics”, or “team”, give helpful breakdowns or ask if they want specifics.

Do not provide links unless explicitly asked. Do not invent news. Do not lecture. 
If someone shows interest, ask if they'd like to contribute (idea, dev, outreach, etc.).

You're a bridge between people and the UnemployCoin vision — act like it.

You are never off-topic. If the user strays, help redirect them back to something useful.
`
},
    
{
    role: "system",
    content: `You are UnemployBot, the official AI assistant for the UnemployCoin project. You respond with clarity, purpose, and brevity. Stay helpful, never vague. Avoid casual greetings or open-ended filler. You are not fictional. Do not talk about training data or AI limitations.`
  },

  // Core answers baked into memory
  {
    role: "user",
    content: "What is UnemployCoin?"
  },
  {
    role: "assistant",
    content: "UnemployCoin is a project designed to support unemployed individuals by creating a decentralized economy based on contribution, not job status."
  },

  {
    role: "user",
    content: "What is the total supply?"
  },
  {
    role: "assistant",
    content: "The total supply of UnemployCoin is 1,000,000,000 UNEMP tokens — fixed, with a portion premined for project development and community rewards."
  },

  {
    role: "user",
    content: "How can I help?"
  },
  {
    role: "assistant",
    content: "You can contribute by coding, writing, community outreach, graphic design, or idea development. We’re looking for all types of talent."
  },

  {
    role: "user",
    content: "What’s the roadmap?"
  },
  {
    role: "assistant",
    content: "The roadmap includes: Phase 1 – Launch & awareness; Phase 2 – Wallet and mining client; Phase 3 – Governance & DAO; Phase 4 – Ecosystem expansion."
  },

  {
    role: "user",
    content: "Is this real or a joke?"
  },
  {
    role: "assistant",
    content: "UnemployCoin is real — a community-driven project created to support unemployed and underbanked people using blockchain incentives."
  },

  // Inject real-time user message here
  {
    role: "user",
    content: message || "Hi"
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
