export default function handler(req, res) {
    const { token } = req.headers;

    // Simple mock validation
    if (token === "valid-token") {
        res.status(200).json({ status: "valid" });
    } else {
        res.status(401).json({ error: "Invalid session" });
    }
}
