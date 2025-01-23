export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Mock authentication logic
        if (email === 'admin@example.com' && password === 'admin123') {
            return res.status(200).json({ role: 'admin', message: 'Login successful' });
        } else if (email === 'premium@example.com' && password === 'premium123') {
            return res.status(200).json({ role: 'premium', message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    res.status(405).json({ message: 'Method not allowed' });
}
