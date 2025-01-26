export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Hardcoded credentials for testing
    if (email === "admin@example.com" && password === "admin123") {
      return res.status(200).json({ role: "admin", redirect: "/admin.html" });
    } else if (email === "guest@example.com" && password === "guest123") {
      return res.status(200).json({ role: "guest", redirect: "/guest-dash.html" });
    } else if (email === "premium@example.com" && password === "premium123") {
      return res.status(200).json({ role: "premium", redirect: "/guest_premium-dash.html" });
    }

    // If credentials are invalid
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // If the request is not POST
  return res.status(405).json({ message: "Method not allowed" });
}
