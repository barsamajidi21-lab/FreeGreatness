import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      // STEP 1: We replaced the localhost:5000 link with the direct Mediastack URL
      const apiKey = import.meta.env.VITE_MEDIASTACK_KEY;
      const res = await fetch(`https://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${category}&languages=en`);
      
      if (!res.ok) throw new Error("API Connection Failed");
      
      const json = await res.json();
      // Mediastack puts its articles inside a property called 'data'
      return json.data; 
    },
  });

  // HIGH-TECH LOADING STATE
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

  // ERROR STATE
  if (error) return (
    <div style={{ 
      textAlign: 'center', 
      color: '#ff4444', 
      padding: '50px', 
      border: '1px solid #ff4444',
      backgroundColor: 'rgba(255, 68, 68, 0.1)',
      fontFamily: 'monospace'
    }}>
      [!] ERROR: INTEL_VULNERABILITY_DETECTED // API_OFFLINE
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
          // Mediastack uses 'url' instead of 'intelUrl'
          sourceUrl={item.url} 
        />
      ))}
    </motion.div>
  );
}