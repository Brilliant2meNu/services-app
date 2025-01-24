import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: text }],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
}
