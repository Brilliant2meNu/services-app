import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, userEmail } = req.body;

    try {
      const { data, error } = await supabase
        .from('auth_table')
        .upsert({ email: userEmail, first_name: firstName, role: 'regular' }, { onConflict: ['email'] });

      if (error) {
        return res.status(400).json({ message: 'Failed to save user info.' });
      }

      res.status(200).json({ message: 'User info saved successfully.', data });
    } catch (err) {
      console.error('Supabase Error:', err);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
