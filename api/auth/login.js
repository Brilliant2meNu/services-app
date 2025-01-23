import jwt from "jsonwebtoken";

const SECRET_KEY = "your-secret-key";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const users = [
            { email: "admin@example.com", password: "admin123", role: "admin" },
            { email: "premium@example.com", password: "premium123", role: "premium" },
        ];

        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

            return res.status(200).json({
                role: user.role,
                message: "Login successful",
                token, // This is the passkey you need!
            });
        } else {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
