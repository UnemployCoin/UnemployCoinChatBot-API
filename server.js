import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import cors from 'cors'; // ✅ Add this

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // ✅ Allow cross-origin frontend requests

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/ask', async (req, res) => {
  const { message } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
          content: "You are the official UnemployCoin assistant. Help users understand the project, roadmap, tools, and tokenomics. Keep it helpful, simple, and a little fun."
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
  res.send(data);
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
