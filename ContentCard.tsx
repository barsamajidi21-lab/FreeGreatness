import { motion } from "framer-motion";

export default function ContentCard({ item, sourceUrl }: { item: any, sourceUrl: string }) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        scale: 1.02, 
        rotateY: 5,
        boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.2)",
        borderColor: "#00d4ff" 
      }}
      transition={{ duration: 0.5, type: "spring" }}
      viewport={{ once: true }}
      style={{ 
        border: '1px solid rgba(255, 255, 255, 0.2)', 
        padding: '24px', 
        backgroundColor: 'rgba(15, 15, 25, 0.8)', 
        backdropFilter: 'blur(10px)',
        position: 'relative',
        marginBottom: '20px',
        fontFamily: 'monospace',
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      {/* Animated Scanline Effect */}
      <motion.div 
        animate={{ y: [0, 400] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      />

      <span style={{ 
        fontWeight: 'bold', 
        color: '#00d4ff', 
        fontSize: '11px', 
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        // {item.category || 'SYSTEM_INTEL'}
      </span>

      <h2 style={{ 
        fontSize: '24px', 
        margin: '12px 0', 
        lineHeight: '1.2', 
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '-0.5px'
      }}>
        {item.headline || 'NO DATA'}
      </h2>

      <p style={{ 
        fontSize: '15px', 
        lineHeight: '1.6', 
        color: '#a0a0b0',
        marginBottom: '20px' 
      }}>
        {item.summary}
      </p>
      
      <div style={{ 
        marginTop: '15px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '15px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <small style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '9px' }}>
            ORIGIN: {item.leader}
          </small>
          <small style={{ color: '#505060', fontSize: '9px' }}>
            TS: {item.publishedAt ? new Date(item.publishedAt).getTime() : 'UNKNOWN'}
          </small>
        </div>
        
        {sourceUrl && (
          <motion.a 
            whileHover={{ scale: 1.1, backgroundColor: '#00d4ff', color: '#000' }}
            href={sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: '#00d4ff', 
              border: '1px solid #00d4ff',
              textDecoration: 'none', 
              fontWeight: 'bold',
              fontSize: '10px', 
              padding: '8px 14px',
              letterSpacing: '1px'
            }}
          >
            DECRYPT_FULL_FILE →
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}