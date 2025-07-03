# 🤖 UnemployCoinChatBot-API

**UnemployCoinChatBot-API** is the secure backend service that powers the official AI assistant for the [UnemployCoin](https://unemploycoin.com) project. It acts as a proxy between the public-facing chatbot and OpenRouter’s AI models, ensuring API key security, consistent messaging, and future expansion features like logging, role memory, and contributor onboarding.

---

## 🔧 How It Works

- Receives questions from users on the [UnemployCoin chatbot frontend](https://unemploycoin.com)
- Sends those questions to a free OpenRouter model (currently using `deepseek/deepseek-coder-v3:free`)
- Returns the response while filtering tone and keeping context clean
- Secures the API key by handling all AI requests server-side (no exposure in the frontend)

---

## 🧠 Current AI Model

> `deepseek/deepseek-coder-v3:free`  
Free, fast, and intelligent enough to behave like a helpful assistant.  
Future upgrades may use OpenRouter’s GPT-4 or Claude models when needed.

---

## 📁 Folder Structure
```
.
├── server.js # Express server with AI routing logic
├── package.json # Node.js dependencies and setup
└── .env # Securely stores your OpenRouter API key (NOT committed)
```
---

🌐 Live Deployment
This project is hosted on Render and publicly accessible at:

➡️ https://unemploycoinchatbot-api.onrender.com

It responds to POST requests at /api/ask with a JSON body:

---

🔒 Security
The OpenRouter API key is never exposed to the public

CORS headers are restricted to only allow requests from the frontend at https://unemploycoin.com

Supports expanding with rate limiting, logs, and contribution tools

---

🧩 Roadmap
 Add chat logging and basic analytics

 Enable real-time context memory (limited)

 Explore multi-model fallback or chaining

 OpenAPI schema for better dev integration

---

🧑‍💻 Contributing
This backend is part of the larger UnemployCoin ecosystem. If you’d like to help with the assistant, integrations, or features, reach out through the site or open a GitHub issue.

---

📜 License
MIT License — free to use, modify, and deploy with credit to UnemployCoin.
