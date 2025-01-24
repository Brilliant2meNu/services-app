export default function handler(req, res) {
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

    if (token === 'admin-token') {
      return res.status(200).json({ message: 'Session valid', role: 'admin' });
    } else if (token === 'premium-token') {
      return res.status(200).json({ message: 'Session valid', role: 'premium' });
    } else {
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
