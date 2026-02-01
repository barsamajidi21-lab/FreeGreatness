import { motion } from "framer-motion";

export default function ContentCard({ item, sourceUrl }: { item: any, sourceUrl: string }) {
  if (!item) return null;

  const cleanTitle = (title: string) => {
    return title
      .replace(/\[image \d+ of \d+\]/gi, '') 
      .replace(/\(.*\)/g, '')               
      .trim();
  };

  const rawDate = item.published_at ? new Date(item.published_at) : null;
  const formattedDate = rawDate && !isNaN(rawDate.getTime()) 
    ? rawDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="news-card"
      // REMOVED 30px margin, reduced padding and border radius for a sleeker look
      style={{ backgroundColor: '#fff', marginBottom: '8px', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)' }}
    >
      {item.image && (
        <div style={{ padding: '10px 10px 0 10px' }}>
          <img src={item.image} alt="visual" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
        </div>
      )}

      <div style={{ padding: '15px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <span style={{ fontWeight: '800', color: '#00a8ff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {item.category || 'GLOBAL'}
          </span>
          {formattedDate && <small style={{ color: '#b2bec3', fontSize: '10px' }}>{formattedDate}</small>}
        </div>

        <h2 style={{ fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.3' }}>
          {cleanTitle(item.title)}
        </h2>

        <p style={{ fontSize: '14px', color: '#636e72', marginBottom: '15px', lineHeight: '1.5' }}>
          {item.description}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f8f9fa', paddingTop: '12px' }}>
          <div style={{ color: '#2d3436', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase' }}>
            {item.source || 'Global Intel'}
          </div>
          <motion.a 
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            whileHover={{ scale: 1.05 }}
            style={{ color: '#00a8ff', textDecoration: 'none', fontWeight: '800', fontSize: '12px' }}
          >
            READ SOURCE →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}