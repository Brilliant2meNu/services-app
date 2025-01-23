export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Mock authentication logic
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = "admin-token"; // Example static token for admin
      return res.status(200).json({ role: 'admin', token, message: 'Login successful' });
    } else if (email === 'premium@example.com' && password === 'premium123') {
      const token = "premium-token"; // Example static token for premium user
      return res.status(200).json({ role: 'premium', token, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
