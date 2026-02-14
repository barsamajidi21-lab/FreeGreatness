export const generateIntelHook = async (headline: string) => {
  const apiKey = "AIzaSyBEkU1pehMTvm1pyVyCAWA-KGE9k8eGT7o";
  
  try {
    // UPDATED: Changed v1beta to v1 for better stability across regions
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Headline: ${headline}. Ask one short, curiosity-piquing question.` }] }]
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("GOOGLE ERROR:", data.error.message);
      return "Intelligence analysis restricted...";
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Exploring deeper implications...";
    
  } catch (error) {
    return "Connection lost...";
  }
};