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

// ✅ Fallback to internal knowledge if rate-limited or failed
if (data?.error?.code === 429 || response.status >= 400) {
  const userInput = message.toLowerCase();

  const localKnowledge = {
    "what is unemploycoin": "UnemployCoin is a crypto project designed to support unemployed individuals through blockchain-based incentives and a decentralized community.",
    "total supply": "The total supply of UnemployCoin is 1,000,000,000 UNEMP tokens.",
    "roadmap": "The roadmap includes: Phase 1 – Launch, Phase 2 – Wallet & Mining Client, Phase 3 – DAO Governance, Phase 4 – Ecosystem Expansion.",
    "how to contribute": "You can contribute by coding, writing, helping with outreach, testing, or joining discussions. Everyone is welcome.",
    "default": "I’m currently at my request limit, but I can still help! Try asking something like 'What is UnemployCoin?' or 'How can I contribute?'"
  };

  const matched = Object.keys(localKnowledge).find(key => userInput.includes(key));
  const reply = matched ? localKnowledge[matched] : localKnowledge["default"];

  return res.send({
    choices: [
      {
        message: {
          content: reply
        }
      }
    ]
  });
}

    const data = await response.json();
    console.log("✅ OpenRouter API response:", JSON.stringify(data, null, 2));
    res.send(data);

    console.log("🌐 Status:", response.status, response.ok);

  } catch (err) {
    console.error("❌ OpenRouter error:", err);
    res.status(500).json({ error: "⚠️ I've hit my daily request limit. Please try again tomorrow or check back later. Thanks for supporting UnemployCoin!" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
