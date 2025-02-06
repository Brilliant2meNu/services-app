
import { supabase } from "./supabaseConfig.js";

export const saveToDatabase = async (analysis) => {
  try {
    const { data, error } = await supabase.from("interaction_history").insert([
      { analysis }
    ]);

    if (error) {
      console.error("Error saving to database:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error saving to database:", err);
    return null;
  }
};
