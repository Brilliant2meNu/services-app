export default function handler(req, res) {
  console.log("Validate Session Called");

  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(401).json({ error: 'No authorization header provided' });
    }

    const token = authHeader.split(' ')[1];

    if (token === 'admin-token') {
      console.log("Admin session validated");
      return res.status(200).json({ message: 'Session valid', role: 'admin' });
    } else if (token === 'premium-token') {
      console.log("Premium session validated");
      return res.status(200).json({ message: 'Session valid', role: 'premium' });
    } else {
      console.log("Invalid token");
      return res.status(401).json({ error: 'Invalid token' });
    }
  }

  console.log("Invalid method");
  res.status(405).json({ error: 'Method not allowed' });
}
