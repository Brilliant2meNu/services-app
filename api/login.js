import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Fetch user from Supabase
      const { data: user, error } = await supabase
        .from('auth_table')
        .select('email, password, role')
        .eq('email', email)
        .single();

      if (error || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check if the provided password matches
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Redirect based on the role
      let redirectUrl = '';
      switch (user.role) {
        case 'admin':
          redirectUrl = '/admin.html';
          break;
        case 'premium':
          redirectUrl = '/guest_premium-dash.html';
          break;
        case 'regular':
          redirectUrl = '/guest-dash.html';
          break;
        default:
          return res.status(403).json({ message: 'Unauthorized role' });
      }

      return res.status(200).json({ role: user.role, redirect: redirectUrl });
    } catch (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // If the request is not POST
  return res.status(405).json({ message: 'Method not allowed' });
}
