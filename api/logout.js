import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ovmdpupofhhudxhitoov.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bWRwdXBvZmhodWR4aGl0b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMjQ1MjUsImV4cCI6MjA1MzYwMDUyNX0.r2SgtfiL8c4rTGcXOBPhU9csCztLLjP8ibEXat46gaM"
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ error: "Session token is required." });
  }

  try {
    const { error } = await supabase
      .from("sessions")
      .update({ is_active: false })
      .eq("session_token", token);

    if (error) {
      return res.status(400).json({ error: "Failed to log out." });
    }

    res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
}
