import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_MEDIASTACK_KEY;
      
      // Step 1: Define the insecure HTTP source (Mediastack's limitation)
      const targetUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${category}&languages=en`;
      
      // Step 2: Use AllOrigins proxy to bypass HTTPS security blocks on Vercel
      // We add a timestamp to the URL to force fresh data and prevent caching
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&timestamp=${Date.now()}`;
      
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error("API Connection Failed");
      
      const json = await res.json();
      
      // Step 3: Parse the proxy contents string back into a real JavaScript object
      let parsedData;
      try {
        parsedData = typeof json.contents === "string" ? JSON.parse(json.contents) : json.contents;
      } catch (e) {
        throw new Error("Data corruption during synchronization");
      }
      
      // Step 4: Handle Mediastack-specific errors (like invalid keys)
      if (parsedData.error) {
        throw new Error(parsedData.error.message || "Access Denied");
      }

      // Step 5: Ensure data exists before returning
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("No intel streams found");
      }
      
      return parsedData.data; 
    },
    // Keep trying for a few seconds if it fails
    retry: 1
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
      [!] ERROR: INTEL_VULNERABILITY_DETECTED // {error instanceof Error ? error.message.toUpperCase() : "OFFLINE"}
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