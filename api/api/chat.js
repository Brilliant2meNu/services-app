export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful beauty assistant." },
                    { role: "user", content: message }
                ]
            })
        });

        if (!openaiResponse.ok) {
            const errorData = await openaiResponse.json();
            console.error("OpenAI API Error:", errorData);
            return res.status(500).json({ error: "Failed to fetch response from OpenAI" });
        }

        const data = await openaiResponse.json();
        res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
