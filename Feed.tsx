import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_MEDIASTACK_KEY;
      
      // We use the HTTP version because Mediastack Free doesn't support HTTPS
      const targetUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${category}&languages=en`;
      
      // We use a CORS proxy because Vercel (HTTPS) blocks direct HTTP calls
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error("API Connection Failed");
      
      const json = await res.json();
      // AllOrigins wraps the result in a 'contents' string that we must parse
      const parsedData = JSON.parse(json.contents);
      
      // Check if data exists in the response
      if (!parsedData.data) throw new Error("No Data Found");
      
      return parsedData.data; 
    },
  });

  if (isLoading) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ 
        textAlign: 'center', 
        padding: '100px', 
        color: '#00d4ff', 
        fontFamily: 'monospace',
        letterSpacing: '5px' 
      }}
    >
      &gt; SYNCHRONIZING_GLOBAL_INTEL_STREAMS...
    </motion.div>
  );

  if (error) return (
    <div style={{ 
      textAlign: 'center', 
      color: '#ff4444', 
      padding: '50px', 
      border: '1px solid #ff4444',
      backgroundColor: 'rgba(255, 68, 68, 0.1)',
      fontFamily: 'monospace'
    }}>
      [!] ERROR: INTEL_VULNERABILITY_DETECTED // {error.message}
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1 
          }
        }
      }}
      style={{ display: 'grid', gap: '25px' }}
    >
      {data?.map((item: any, i: number) => (
        <ContentCard 
          key={i} 
          item={item} 
          sourceUrl={item.url} 
        />
      ))}
    </motion.div>
  );
}