export async function generateAISummary(content) {
  const API_KEY = "AIzaSyBl61ZaNr5qcWHUtm7VJN_sxyGZBx86mOQ";

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
      API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Summarize the following academic content in 2 simple lines for junior students:\n\n${content}`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  // ✅ SAFETY CHECK (VERY IMPORTANT)
  if (!data.candidates || data.candidates.length === 0) {
    return "AI summary unavailable (quota / network issue)";
  }

  return data.candidates[0].content.parts[0].text;
}
