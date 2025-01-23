export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Mock authentication logic
    if (email === 'admin@example.com' && password === 'admin123') {
      const token = "YOUR_SAMPLE_TOKEN"; // Replace with a static or generated token
      return res.status(200).json({ role: 'admin', token, message: 'Login successful' });
    } else if (email === 'premium@example.com' && password === 'premium123') {
      const token = "YOUR_SAMPLE_TOKEN_FOR_PREMIUM"; // Replace with a static or generated token
      return res.status(200).json({ role: 'premium', token, message: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  res.status(405).json({ message: 'Method not allowed' });
}
