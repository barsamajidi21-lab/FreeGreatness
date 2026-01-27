// Feed.tsx
import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/news/${category}`);
      if (!res.ok) throw new Error("Server Down");
      return res.json();
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
      [!] ERROR: INTEL_VULNERABILITY_DETECTED // SERVER_OFFLINE
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
            staggerChildren: 0.1 // This creates the "ripple" effect
          }
        }
      }}
      style={{ display: 'grid', gap: '25px' }}
    >
      {data?.map((item: any, i: number) => (
        <ContentCard 
          key={i} 
          item={item} 
          sourceUrl={item.intelUrl} 
        />
      ))}
    </motion.div>
  );
}