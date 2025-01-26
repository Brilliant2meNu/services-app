export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Admin credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      return res.status(200).json({ role: 'admin', token: "admin-token", redirectUrl: "/admin.html", message: 'Login successful' });
    }

    // Premium user credentials
    if (email === 'premium@example.com' && password === 'premium123') {
      return res.status(200).json({ role: 'premium', token: "premium-token", redirectUrl: "/guest_premium-dash.html", message: 'Login successful' });
    }

    // Guest user credentials
    if (email === 'guest@example.com' && password === 'guest123') {
      return res.status(200).json({ role: 'guest', token: "guest-token", redirectUrl: "/guest-dash.html", message: 'Login successful' });
    }

    // Invalid credentials
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}
