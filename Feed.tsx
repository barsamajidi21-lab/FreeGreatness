import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      const apiKey = "fb5888f12629e802a9245099692d1300"; 
      const targetUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${category}&languages=en&limit=30`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const res = await fetch(proxyUrl);
      const json = await res.json();
      const parsedData = JSON.parse(json.contents);
      
      if (parsedData.error) throw new Error(parsedData.error.message);

      const rawNews = parsedData.data || [];

      // 1. REMOVE DUPLICATES: Only keep one version of the same title
      const uniqueNews = rawNews.filter((item, index, self) =>
        index === self.findIndex((t) => t.title === item.title)
      );

      // 2. QUALITY FILTER: Hide news with descriptions shorter than 40 characters
      return uniqueNews.filter(item => item.description && item.description.length > 40);
    },
    // BUDGET PROTECTION: Only fetch ONCE. No auto-refreshing.
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    retry: false 
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