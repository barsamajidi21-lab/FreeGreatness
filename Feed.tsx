import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react"; 
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
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
    retry: false
  });

  // --- IMAGE SORTING & SEARCH OPTIMIZATION ---
  const filteredData = useMemo(() => {
    if (!allNews) return [];
    
    // 1. Filter by Category and Search
    let results = allNews.filter((item: any) => {
      const matchesCategory = category === "general" ? true : item.category === category;
      const matchesSearch = item.title.toLowerCase().includes(searchBarQuery.toLowerCase()) || 
                           (item.description && item.description.toLowerCase().includes(searchBarQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    // 2. IMAGE-FIRST SORTING: Moves news with images to the top
    return results.sort((a: any, b: any) => {
      const aHasImage = a.image ? 1 : 0;
      const bHasImage = b.image ? 1 : 0;
      return bHasImage - aHasImage;
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
      <div style={{ fontSize: '10px', color: '#b2bec3', textAlign: 'center', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Notice: Content for informational purposes. Not financial, medical, or legal advice.
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((item: any, i: number) => (
          <ContentCard 
            key={item.title + i} // Unique key for better performance
            item={{
                ...item,
                // AI Logic placeholder: In a production app, we fetch this from an AI route
                hook: item.hook || "Intelligence Analysis Pending..." 
            }} 
            sourceUrl={item.url} 
            priority={i < 3} 
          />
        ))
      ) : (
        <div style={{ color: '#636e72', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px' }}>
          No intelligence found matching: "{searchBarQuery}"
        </div>
      )}
    </motion.div>
  );
}