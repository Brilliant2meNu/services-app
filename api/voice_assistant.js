
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: text }],
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const gptResponse = result.choices[0].message.content;
        return res.status(200).json({ reply: gptResponse });
      } else {
        const error = await response.text();
        return res.status(500).json({ error });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};
