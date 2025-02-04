import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ovmdpupofhhudxhitoov.supabase.co",
  "YOUR_SUPABASE_ANON_KEY"
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, password } = req.body;

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("first_name", firstName)
      .eq("last_name", lastName);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists. Try logging in!" });
    }

    // Insert new guest user
    const { data, error } = await supabase.from("users").insert([
      {
        first_name: firstName,
        last_name: lastName,
        password: password,
        role: "guest"
      }
    ]);

    if (error) {
      return res.status(400).json({ error: "Failed to save user." });
    }

    res.status(200).json({ message: "User saved successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
}
