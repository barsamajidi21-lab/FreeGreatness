import { useQuery } from "@tanstack/react-query";
import ContentCard from "./ContentCard"; 
import { motion } from "framer-motion";

export default function Feed({ category }: { category: string }) {
  const { data: allNews, isLoading, error } = useQuery({
    queryKey: ["bulk-intel-stream"],
    queryFn: async () => {
      // NEW API KEY APPLIED
      const apiKey = "87e232ce9616043677a828f7c81790f5"; 
      
      // BULK REQUEST: Fetching all categories in 1 hit to save credits
      const categories = "general,business,entertainment,health,science,sports,technology";
      const targetUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${categories}&languages=en&limit=100`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      
      const res = await fetch(proxyUrl);
      const json = await res.json();
      const parsedData = JSON.parse(json.contents);
      
      if (parsedData.error) throw new Error(parsedData.error.message);

      const rawNews = parsedData.data || [];

      // CLEANING: Remove duplicates and news with no real description
      return rawNews.filter((item, index, self) =>
        index === self.findIndex((t) => t.title === item.title) &&
        (item.description && item.description.length > 40)
      );
    },
    // LOCK DOWN: Do not refetch unless the page is manually refreshed
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
    retry: false
  });

  // LOCAL FILTERING: Switching categories here uses 0 credits
  const filteredData = allNews?.filter(item => 
    category === "general" ? true : item.category === category
  ) || [];

  if (isLoading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#00d4ff', fontFamily: 'monospace' }}>
      &gt; EXECUTING_SINGLE_STRAT_GATHERING...
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', color: '#ff4444', padding: '50px', border: '1px solid #ff4444', fontFamily: 'monospace' }}>
      [!] ERROR: {error instanceof Error ? error.message.toUpperCase() : "INTEL_LINK_BROKEN"}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'grid', gap: '25px' }}>
      {filteredData.length > 0 ? (
        filteredData.map((item: any, i: number) => (
          <ContentCard key={i} item={item} sourceUrl={item.url} />
        ))
      ) : (
        <div style={{ color: '#505060', textAlign: 'center', padding: '50px', fontFamily: 'monospace' }}>
          &gt; NO_DATA_IN_CURRENT_BUFFER: {category.toUpperCase()}
        </div>
      )}
    </motion.div>
  );
}