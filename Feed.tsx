import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      // 1. Get the NewsAPI Key from your Vercel settings
      const apiKey = import.meta.env.VITE_NEWS_KEY;
      
      // 2. Direct HTTPS URL (No proxy needed!)
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
      
      const res = await fetch(url);
      const json = await res.json();
      
      if (json.status === "error") throw new Error(json.message);
      
      // 3. NewsAPI stores articles in 'articles', not 'data'
      return json.articles || [];
    },
  });

  if (isLoading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ textAlign: 'center', padding: '100px', color: '#00d4ff', fontFamily: 'monospace', letterSpacing: '5px' }}
    >
      &gt; SYNCHRONIZING_GLOBAL_INTEL_STREAMS...
    </motion.div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', color: '#ff4444', padding: '50px', border: '1px solid #ff4444', backgroundColor: 'rgba(255, 68, 68, 0.1)', fontFamily: 'monospace' }}>
      [!] ERROR: INTEL_VULNERABILITY_DETECTED // {error instanceof Error ? error.message.toUpperCase() : "OFFLINE"}
    </div>
  );

  return (
    <motion.div 
      initial="hidden" animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
      style={{ display: 'grid', gap: '25px' }}
    >
      {data?.map((item: any, i: number) => (
        <ContentCard key={i} item={item} sourceUrl={item.url} />
      ))}
    </motion.div>
  );
}