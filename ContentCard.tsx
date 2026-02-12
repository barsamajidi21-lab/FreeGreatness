import { motion } from "framer-motion";

// Added 'priority' for speed and 'item.hook' for the AI feature
export default function ContentCard({ item, sourceUrl, priority }: { item: any, sourceUrl: string, priority?: boolean }) {
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
      style={{ 
        backgroundColor: '#fff', 
        marginBottom: '10px', 
        borderRadius: '18px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
        border: '1px solid rgba(0,0,0,0.02)' 
      }}
    >
      {item.image && (
        <div style={{ padding: '10px 10px 0 10px' }}>
          <img 
            src={item.image} 
            alt="visual intelligence" 
            loading={priority ? "eager" : "lazy"} // SPEED: Loads first 3 immediately, delays others
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} 
          />
        </div>
      )}

      <div style={{ padding: '15px 20px' }}>
        {/* CATEGORY & DATE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontWeight: '800', color: '#00a8ff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {item.category || 'GLOBAL'}
          </span>
          {formattedDate && <small style={{ color: '#b2bec3', fontSize: '10px' }}>{formattedDate}</small>}
        </div>

        {/* --- NEW: AI HOOK SECTION --- */}
        {/* This is the customized sentence that captures interest */}
        <div style={{ marginBottom: '8px' }}>
          <span style={{ 
            color: '#1a1a1a', 
            fontSize: '15px', 
            fontWeight: '900', 
            fontStyle: 'italic',
            background: 'linear-gradient(90deg, #f0f7ff, #ffffff)',
            padding: '4px 8px',
            borderRadius: '6px',
            borderLeft: '3px solid #00a8ff',
            display: 'inline-block'
          }}>
            {item.hook || "Analyzing impact..."} 
          </span>
        </div>

        {/* HEADLINE */}
        <h2 style={{ fontSize: '18px', margin: '0 0 8px 0', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.3' }}>
          {cleanTitle(item.title)}
        </h2>

        {/* DESCRIPTION */}
        <p style={{ fontSize: '14px', color: '#636e72', marginBottom: '15px', lineHeight: '1.5' }}>
          {item.description}
        </p>
        
        {/* SOURCE & ACTION */}
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

        {/* --- LEGAL DISCLAIMER LABEL --- */}
        <div style={{ 
          marginTop: '15px', 
          paddingTop: '10px', 
          borderTop: '1px dashed #f1f2f6', 
          fontSize: '9px', 
          color: '#bdc3c7', 
          lineHeight: '1.2' 
        }}>
          ⚠️ NOT FINANCIAL, MEDICAL, OR LEGAL ADVICE. INFORMATION PROVIDED FOR GENERAL INTELLIGENCE PURPOSES ONLY.
        </div>
      </div>
    </motion.div>
  );
}