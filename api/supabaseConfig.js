
// supabaseConfig.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://ovmdpupofhhudxhitoov.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bWRwdXBvZmhodWR4aGl0b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMjQ1MjUsImV4cCI6MjA1MzYwMDUyNX0.r2SgtfiL8c4rTGcXOBPhU9csCztLLjP8ibEXat46gaM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
