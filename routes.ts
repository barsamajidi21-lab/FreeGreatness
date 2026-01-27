import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/news", async (req, res) => {
    // Mode can be 'important' or 'interesting' based on your prompt
    const { mode = 'important', category = 'all', lang = 'en' } = req.query;
    
    const GEMINI_KEY = "AIzaSyD8kuPMFnrZdBkM5Peqomj96TTi18G9A8k";
    const NEWS_KEY = "6d77f5c943d44064828c47279fb2983a";

  try {
    // 1. Research & Aggregate
    const query = category === 'all' ? 'top-headlines' : category;
    const newsRes = await fetch(`https://newsapi.org/v2/top-headlines?q=${query}&language=en&apiKey=${NEWS_KEY}`);
    const newsData = await newsRes.json();
    
    // 2. Synthesis (The Brain handles the mode and translation)
    const prompt = `Act as a master news synthesizer. 
      Mode: ${mode.toUpperCase()} (Interesting = fun/viral/surprising, Important = high-impact/serious).
      Target Language: ${lang}.
      Task: Summarize these articles into a JSON list of 5-10 items.
      Format: {"items": [{"headline": "...", "summary": "1 sentence", "explanation": "2-4 sentences"}]}
      Articles: ${JSON.stringify(newsData.articles.slice(0, 10))}`;

    const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const aiData = await aiRes.json();
    const cleanJson = JSON.parse(aiData.candidates[0].content.parts[0].text.replace(/```json|```/g, ""));
    res.json(cleanJson.items || cleanJson);

  } catch (error) {
    res.status(500).json({ error: "Brain failure" });
  }
});

  return createServer(app);
}