/**
 * Sends a news headline to the Google Gemini engine to generate
 * a curiosity-piquing question for the user.
 */
export const generateIntelHook = async (headline: string) => {
  // Security: We pull the Gemini key from environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini Key missing. Please set VITE_GEMINI_API_KEY in your environment.");
    return "Analyzing impact...";
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ 
            text: `You are a high-level intelligence analyst. Create a 1-sentence curiosity-driven question based on this news headline: "${headline}". The question must make the reader feel like they need to know the answer to understand their future. NO extra text, NO quotes, just the question.` 
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 60,
        }
      }),
    });

    const data = await response.json();
    
    // Return the AI's response or a fallback if it fails
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Exploring deeper implications...";
    
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Intelligence update pending...";
  }
};