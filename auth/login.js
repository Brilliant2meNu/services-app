export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Hardcoded credentials for testing
    if (normalizedEmail === "admin@example.com" && password === "admin123") {
      return res.status(200).json({ role: "admin", redirect: "/admin.html" });
    } else if (normalizedEmail === "guest@example.com" && password === "guest123") {
      return res.status(200).json({ role: "guest", redirect: "/guest-dash.html" });
    } else if (normalizedEmail === "premium@example.com" && password === "premium123") {
      return res.status(200).json({ role: "premium", redirect: "/guest_premium-dash.html" });
    }

    // If credentials are invalid
    console.log(`Invalid login attempt: email=${email}`); // Optional for debugging
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // If the request is not POST
  return res.status(405).json({ message: "Method not allowed" });
}
