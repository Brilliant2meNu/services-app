export default async function handler(req, res) {
    // Ensure it's a POST request
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    // Validate the message input
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // Communicate with OpenAI API
        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // Pulling key from environment variable
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful beauty assistant." },
                    { role: "user", content: message },
                ],
            }),
        });

        const data = await openaiResponse.json();

        // Handle OpenAI response
        if (openaiResponse.ok) {
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            console.error("OpenAI API Error:", data);
            res.status(500).json({ error: "Failed to fetch response from OpenAI" });
        }
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).json({ error: "Failed to communicate with OpenAI" });
    }
}
