import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { generateIntelHook } from "./aiService"; // Make sure to create aiService.ts first!

export default function ContentCard({ item, sourceUrl, priority }: { item: any, sourceUrl: string, priority?: boolean }) {
  const [aiHook, setAiHook] = useState(item.hook || "Analyzing impact...");

  // AI Hook Trigger
  useEffect(() => {
    // Only fetch if we don't already have a custom hook
    if (!item.hook || item.hook === "Analyzing impact...") {
      generateIntelHook(item.title).then((result) => {
        setAiHook(result);
      });
    }
  }, [item.title, item.hook]);

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
            loading={priority ? "eager" : "lazy"}
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} 
          />
        </div>
      )}

      <div style={{ padding: '15px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontWeight: '800', color: '#00a8ff', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {item.category || 'GLOBAL'}
          </span>
          {formattedDate && <small style={{ color: '#b2bec3', fontSize: '10px' }}>{formattedDate}</small>}
        </div>

        {/* --- AI HOOK SECTION (ACTIVE) --- */}
        <div style={{ marginBottom: '8px' }}>
          <motion.span 
            key={aiHook}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              color: '#1a1a1a', 
              fontSize: '15px', 
              fontWeight: '900', 
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #f0f7ff, #ffffff)',
              padding: '4px 8px',
              borderRadius: '6px',
              borderLeft: '3px solid #00a8ff',
              display: 'inline-block'
            }}
          >
            {aiHook} 
          </motion.span>
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