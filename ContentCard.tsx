import { motion } from "framer-motion";

export default function ContentCard({ item, sourceUrl }: { item: any, sourceUrl: string }) {
  if (!item) return null;

  // Logic: Only extract the date (YYYY-MM-DD). If no date exists, this becomes null.
  const rawDate = item.published_at ? new Date(item.published_at) : null;
  const formattedDate = rawDate && !isNaN(rawDate.getTime()) 
    ? rawDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0px 20px 40px rgba(0, 168, 255, 0.12)",
      }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="news-card"
      style={{ 
        padding: '0px', 
        backgroundColor: '#fff', 
        marginBottom: '30px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#2d3436',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default'
      }}
    >
      {/* Image with Natural Rounded Edges */}
      {item.image && (
        <div style={{ padding: '15px' }}>
          <img 
            src={item.image} 
            alt="intel_visual" 
            style={{ 
              width: '100%', 
              height: '240px', 
              objectFit: 'cover', 
              borderRadius: '20px', // Cool natural look
            }} 
          />
        </div>
      )}

      <div style={{ padding: '0 25px 25px 25px' }}>
        <span style={{ 
          fontWeight: '800', 
          color: '#00a8ff', 
          fontSize: '11px', 
          letterSpacing: '1.5px',
          textTransform: 'uppercase'
        }}>
          {item.category || 'GLOBAL'}
        </span>

        <h2 style={{ 
          fontSize: '22px', 
          margin: '10px 0', 
          lineHeight: '1.3', 
          fontWeight: '800',
          color: '#1a1a1a'
        }}>
          {item.title}
        </h2>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#636e72',
          marginBottom: '20px' 
        }}>
          {item.description}
        </p>
        
        <div style={{ 
          marginTop: 'auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderTop: '1px solid #f1f2f6',
          paddingTop: '20px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <small style={{ color: '#2d3436', fontWeight: 'bold', fontSize: '12px' }}>
              {item.source || item.author || 'Global Intel'}
            </small>
            
            {/* DATE LOGIC: Only show if valid date exists, otherwise show nothing */}
            {formattedDate && (
              <small style={{ color: '#b2bec3', fontSize: '11px', marginTop: '2px' }}>
                {formattedDate}
              </small>
            )}
          </div>
          
          {sourceUrl && (
            <motion.a 
              whileHover={{ scale: 1.05, color: '#0984e3' }}
              href={sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: '#00a8ff', 
                textDecoration: 'none', 
                fontWeight: '800',
                fontSize: '14px', 
              }}
            >
              More info !
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}