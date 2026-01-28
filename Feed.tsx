import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      // 1. YOUR VERIFIED MEDIASTACK KEY
      const apiKey = "fb5888f12629e802a9245099692d1300"; 
      
      // 2. THE TARGET URL (Mediastack Free uses HTTP)
      const targetUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${category}&languages=en`;
      
      // 3. THE PROXY (Essential for live Vercel sites)
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error("Connection failed");
      
      const json = await res.json();
      
      // 4. PARSE THE DATA
      const parsedData = typeof json.contents === "string" ? JSON.parse(json.contents) : json.contents;
      
      if (parsedData.error) throw new Error(parsedData.error.message || "API Error");
      return parsedData.data || [];
    },
  });

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#00d4ff', fontFamily: 'monospace' }}>
      &gt; SYNCHRONIZING_MEDIASTACK_INTEL...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', color: '#ff4444', padding: '50px', border: '1px solid #ff4444', fontFamily: 'monospace' }}>
      [!] ERROR: {error instanceof Error ? error.message.toUpperCase() : "INTEL_LINK_BROKEN"}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gap: '25px' }}>
      {data?.map((item: any, i: number) => (
        <ContentCard key={i} item={item} sourceUrl={item.url} />
      ))}
    </motion.div>
  );
}