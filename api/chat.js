export default async function handler(req, res) {
    console.log("Request received:", req.method, req.body); // Debugging log

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // Verify the API key is available
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OpenAI API Key is missing in environment variables.");
        }

        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`, // Pass the API key dynamically
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

        if (openaiResponse.ok) {
            console.log("OpenAI response:", data); // Debugging log
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            console.error("OpenAI API Error:", data);
            res.status(500).json({ error: "OpenAI API returned an error.", details: data });
        }
    } catch (error) {
        console.error("Server Error:", error.message); // Debugging log
        res.status(500).json({ error: "Internal server error.", details: error.message });
    }
}
