// aiService.ts

/**
 * Sends a news headline to the Groq AI engine to generate
 * a curiosity-piquing question for the user.
 */
export const generateIntelHook = async (headline: string) => {
  // Security: We pull the key from environment variables
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    console.warn("AI Key missing. Please set VITE_GROQ_API_KEY in your environment.");
    return "Analyzing impact...";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // Using Llama 3.3 70B for high-quality intelligence analysis
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: "You are a high-level intelligence analyst. Create a 1-sentence curiosity-driven question based on this news headline. The question must make the reader feel like they need to know the answer to understand their future. NO extra text, NO quotes, just the question." 
          },
          { role: "user", content: headline }
        ],
        temperature: 0.7,
        max_tokens: 60
      }),
    });

    const data = await response.json();
    
    // Return the AI's response or a fallback if it fails
    return data.choices?.[0]?.message?.content || "Exploring deeper implications...";
    
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Intelligence update pending...";
  }
};