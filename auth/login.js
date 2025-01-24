export default function handler(req, res) {
  console.log("Login API Called");

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email === 'admin@example.com' && password === 'admin123') {
      console.log("Admin login successful");
      return res.status(200).json({ role: 'admin', token: "admin-token", message: 'Login successful' });
    } else if (email === 'premium@example.com' && password === 'premium123') {
      console.log("Premium login successful");
      return res.status(200).json({ role: 'premium', token: "premium-token", message: 'Login successful' });
    } else {
      console.log("Invalid credentials");
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  console.log("Invalid method");
  return res.status(405).json({ message: 'Method not allowed' });
}
