import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ovmdpupofhhudxhitoov.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bWRwdXBvZmhodWR4aGl0b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMjQ1MjUsImV4cCI6MjA1MzYwMDUyNX0.r2SgtfiL8c4rTGcXOBPhU9csCztLLjP8ibEXat46gaM"
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);

    if (error || data.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ role: data[0].role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
