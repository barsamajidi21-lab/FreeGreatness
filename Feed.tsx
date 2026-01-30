import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

// Added searchBarQuery to the props
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

      return rawNews.filter((item: any, index: number, self: any[]) =>
        index === self.findIndex((t) => t.title === item.title) &&
        (item.description && item.description.length > 40)
      );
    },
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    retry: false
  });

  // --- ENHANCED FILTERING ---
  // This now checks BOTH the Category AND the Search Bar text
  const filteredData = allNews?.filter(item => {
    const matchesCategory = category === "general" ? true : item.category === category;
    const matchesSearch = item.title.toLowerCase().includes(searchBarQuery.toLowerCase()) || 
                         (item.description && item.description.toLowerCase().includes(searchBarQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  }) || [];

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#00a8ff', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
      Gathering Intelligence...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', color: '#ff4444', padding: '50px', borderRadius: '20px', background: '#fff' }}>
      [!] CONNECTION ERROR: {error instanceof Error ? error.message.toUpperCase() : "INTEL_LINK_BROKEN"}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gap: '25px' }}>
      {filteredData.length > 0 ? (
        filteredData.map((item: any, i: number) => (
          <ContentCard key={i} item={item} sourceUrl={item.url} />
        ))
      ) : (
        <div style={{ color: '#636e72', textAlign: 'center', padding: '100px', background: 'white', borderRadius: '30px' }}>
          No intelligence found matching: "{searchBarQuery}"
        </div>
      )}
    </motion.div>
  );
}