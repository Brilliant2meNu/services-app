const express = require('express');
const fetch = require('node-fetch');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

const GPT_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const GPT_API_KEY = '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';
const SUPABASE_URL = 'https://ovmdpupofhhudxhitoov.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92bWRwdXBvZmhodWR4aGl0b292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMjQ1MjUsImV4cCI6MjA1MzYwMDUyNX0.r2SgtfiL8c4rTGcXOBPhU9csCztLLjP8ibEXat46gaM';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

router.post('/api/analyze', async (req, res) => {
  try {
    const { analysisResults } = req.body;

    // Process analysisResults with GPT
    const responseFromGPT = await getPlanFromGPT(analysisResults);
    
    // Store the generated plan in Supabase
    await storePlanInSupabase(responseFromGPT);

    res.json({ message: "Skin analysis complete. Plan generated." });
  } catch (error) {
    res.status(500).json({ error: "Error processing analysis." });
  }
});

async function getPlanFromGPT(analysisResults) {
  const prompt = `Generate a skincare plan based on the following analysis: ${JSON.stringify(analysisResults)}`;

  const response = await fetch(GPT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GPT_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 150, // Adjust as needed
      n: 1,
      stop: null,
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

async function storePlanInSupabase(plan) {
  const { data, error } = await supabase
    .from('skincare_plans')
    .insert([{ plan }]);

  if (error) {
    throw new Error('Error storing plan in Supabase: ' + error.message);
  }

  return data;
}

module.exports = router;
