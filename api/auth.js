
// auth.js
import { supabase } from "./supabaseConfig.js";

export async function login(phoneNumber, password) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone_number", phoneNumber)
    .eq("password", password);

  return { data, error };
}

export async function register(phoneNumber, password) {
  const { error } = await supabase
    .from("users")
    .insert([{ phone_number: phoneNumber, password }]);

  return { error };
}
