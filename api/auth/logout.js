export default function handler(req, res) {
    // Destroy session (mock)
    res.status(200).json({ message: "Logged out successfully" });
}
