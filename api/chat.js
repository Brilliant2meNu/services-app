export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, step, isInitialLaunch } = req.body;

    // Handle initial greeting if it's the first interaction
    if (isInitialLaunch && step === 'greet') {
        return res.status(200).json({
            reply: "Hello! Welcome to our salon assistant. I'm here to help you with your beauty needs. To get started, please log into your account if you're an existing client, or type your first name and email so we can assist you better."
        });
    }

    // Handle user interactions after the initial greeting
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
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
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await openaiResponse.json();
        if (!openaiResponse.ok) throw new Error(data.error.message);

        res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).json({ error: "Failed to fetch GPT response" });
    }
}
