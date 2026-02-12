import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react"; // Added for Speed
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category, searchBarQuery }: { category: string, searchBarQuery: string }) {
  const { data: allNews, isLoading, error } = useQuery({
    queryKey: ["bulk-intel-stream"],
    queryFn: async () => {
      const apiKey = "87e232ce9616043677a828f7c81790f5"; 
      const categories = "general,business,entertainment,health,science,sports,technology";
      const targetUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${categories}&languages=en&limit=100`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const res = await fetch(proxyUrl);
      const json = await res.json();
      const parsedData = JSON.parse(json.contents);
      
      if (parsedData.error) throw new Error(parsedData.error.message);

      const rawNews = parsedData.data || [];

      // Filter duplicates and short descriptions
      return rawNews.filter((item: any, index: number, self: any[]) =>
        index === self.findIndex((t: any) => t.title === item.title) &&
        (item.description && item.description.length > 40)
      );
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 mins to increase speed
    refetchOnWindowFocus: false,
    retry: false
  });

  // --- SPEED OPTIMIZATION (Memoization) ---
  // This prevents the app from lagging when users search
  const filteredData = useMemo(() => {
    if (!allNews) return [];
    return allNews.filter((item: any) => {
      const matchesCategory = category === "general" ? true : item.category === category;
      const matchesSearch = item.title.toLowerCase().includes(searchBarQuery.toLowerCase()) || 
                           (item.description && item.description.toLowerCase().includes(searchBarQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [allNews, category, searchBarQuery]);

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '60px', color: '#00a8ff', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
      Gathering Intelligence...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', color: '#ff4444', padding: '30px', borderRadius: '20px', background: '#fff' }}>
      [!] CONNECTION ERROR: {error instanceof Error ? error.message.toUpperCase() : "INTEL_LINK_BROKEN"}
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ display: 'grid', gap: '12px' }}
    >
      {/* LEGAL WARNING: Small, non-intrusive disclaimer above the feed 
          to protect you legally while keeping the professional look.
      */}
      <div style={{ fontSize: '10px', color: '#b2bec3', textAlign: 'center', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Notice: Content for informational purposes. Not financial, medical, or legal advice.
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((item: any, i: number) => (
          // We pass 'priority' to the first 3 items to make them load instantly (Speed)
          <ContentCard key={i} item={item} sourceUrl={item.url} priority={i < 3} />
        ))
      ) : (
        <div style={{ color: '#636e72', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px' }}>
          No intelligence found matching: "{searchBarQuery}"
        </div>
      )}
    </motion.div>
  );
}