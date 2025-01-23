if (email === 'admin@example.com' && password === 'admin123') {
    const token = "mock-token-123"; // Replace with real token logic later
    return res.status(200).json({ role: 'admin', message: 'Login successful', token });
}
