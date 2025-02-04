export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, step, userData, isInitialLaunch } = req.body;

    if (isInitialLaunch && step === 'greet') {
        return res.status(200).json({
            reply: "Hey gorgeous! 💖 Welcome to our salon assistant. What’s your first name?"
        });
    }

    if (step === "collectFirstName") {
        if (!message) {
            return res.status(200).json({ reply: "Oops! I didn’t catch that. What’s your first name?" });
        }

        return res.status(200).json({
            reply: `Nice to meet you, ${message}! 💕 Would you like to take a quick beauty quiz for custom skincare recommendations? Type 'yes' or 'no'.`,
            userData: { firstName: message }
        });
    }

    if (step === "startQuiz") {
        if (message.toLowerCase() === "yes") {
            return res.status(200).json({
                reply: "Awesome! First question: How would you describe your skin type? (Oily, Dry, Combination, Sensitive)",
                userData: { quizStarted: true }
            });
        } else {
            return res.status(200).json({
                reply: "No worries! You can browse our services anytime. 💖 Let me know if you need anything."
            });
        }
    }

    if (step === "askLastName") {
        return res.status(200).json({
            reply: "Before we continue, can you share your last name? This helps personalize your skincare plan. 😊",
            userData: { ...userData, firstName: message }
        });
    }

    if (step === "askPassword") {
        return res.status(200).json({
            reply: "Last step! Create a password for easy access to your personalized skincare plan. 🔒",
            userData: { ...userData, lastName: message }
        });
    }

    if (step === "saveUser") {
        const { firstName, lastName } = userData;
        const password = message;

        // Call the user save function (see save-user.js update below)
        const response = await fetch("https://your-app-url.com/api/save-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, password })
        });

        const data = await response.json();
        if (data.error) {
            return res.status(500).json({ reply: "Oops! Something went wrong. Try again later." });
        }

        return res.status(200).json({
            reply: `You're all set, ${firstName}! 🎉 You can now log in anytime with just your first and last name + password. Want to continue your beauty quiz now?`
        });
    }

    return res.status(400).json({ error: "Invalid request." });
}
