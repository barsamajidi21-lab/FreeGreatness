import { motion } from "framer-motion";

export default function ContentCard({ item, sourceUrl }: { item: any, sourceUrl: string }) {
  if (!item) return null;

  // --- CLEANER FUNCTION ---
  // This removes [image X of Y], (Reuters), and other junk from titles
  const cleanTitle = (title: string) => {
    return title
      .replace(/\[image \d+ of \d+\]/gi, '') // Removes [image 1 of 5]
      .replace(/\(.*\)/g, '')               // Removes (Source Names)
      .trim();
  };

  const rawDate = item.published_at ? new Date(item.published_at) : null;
  const formattedDate = rawDate && !isNaN(rawDate.getTime()) 
    ? rawDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="news-card"
      style={{ backgroundColor: '#fff', marginBottom: '30px', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
    >
      {item.image && (
        <div style={{ padding: '15px' }}>
          <img src={item.image} alt="visual" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '20px' }} />
        </div>
      )}

      <div style={{ padding: '0 25px 25px 25px' }}>
        <span style={{ fontWeight: '800', color: '#00a8ff', fontSize: '11px', textTransform: 'uppercase' }}>
          {item.category || 'GLOBAL'}
        </span>

        <h2 style={{ fontSize: '22px', margin: '10px 0', fontWeight: '800', color: '#1a1a1a' }}>
          {cleanTitle(item.title)}
        </h2>

        <p style={{ fontSize: '16px', color: '#636e72', marginBottom: '20px' }}>
          {item.description}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f2f6', paddingTop: '20px' }}>
          <div>
            <div style={{ color: '#2d3436', fontWeight: 'bold', fontSize: '12px' }}>{item.source || 'Global Intel'}</div>
            {formattedDate && <small style={{ color: '#b2bec3' }}>{formattedDate}</small>}
          </div>
          <motion.a href={sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#00a8ff', textDecoration: 'none', fontWeight: '800' }}>
            More info !
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}