export default function handler(req, res) {
  if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1];

    if (token === "admin-token") {
      return res.status(200).json({ role: "admin" });
    } else if (token === "guest-token") {
      return res.status(200).json({ role: "guest" });
    } else if (token === "premium-token") {
      return res.status(200).json({ role: "premium" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
