export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email === 'admin@example.com' && password === 'admin123') {
      return res.status(200).json({ role: 'admin', token: "admin-token", message: 'Login successful' });
    } else if (email === 'premium@example.com' && password === 'premium123') {
      return res.status(200).json({ role: 'premium', token: "premium-token", message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
