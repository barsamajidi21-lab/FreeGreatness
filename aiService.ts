// aiService.ts
export const generateIntelHook = async (headline: string) => {
  const apiKey = "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";
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: "You are a high-level intelligence analyst. Create a 1-sentence curiosity-driven question based on this headline. The question should make the reader feel like they need to know the answer. NO extra text, just the question." 
          },
          { role: "user", content: headline }
        ],
        temperature: 0.7,
        max_tokens: 50
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || "Analyzing deeper impact...";
  } catch (error) {
    return "Intelligence update pending...";
  }
};