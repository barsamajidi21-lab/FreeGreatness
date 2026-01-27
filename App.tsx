import { useState } from "react";
import Feed from "./Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageContext } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

// --- LUXURY 3D DATA CORE ---
const DataCore = () => (
  <motion.div 
    animate={{ rotateY: 360, rotateX: [0, 5, 0] }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    style={{ perspective: '1200px', transformStyle: 'preserve-3d', margin: '60px auto', width: '200px' }}
  >
    <svg width="200" height="200" viewBox="0 0 100 100">
      <defs>
        <filter id="neon">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M50 5L20 40L10 45L25 85L50 75L75 85L90 45L80 40L50 5Z" 
            stroke="#00d4ff" strokeWidth="1.5" fill="none" filter="url(#neon)" />
      <path d="M50 5V75M20 40L80 40M10 45L90 45M25 85L75 85" stroke="#00d4ff" strokeWidth="0.5" opacity="0.4" />
    </svg>
  </motion.div>
);

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("general");

  const categories = ["general", "business", "technology", "science", "health", "sports", "entertainment"];

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <div style={{ minHeight: '100vh', backgroundColor: '#020204', color: '#ffffff', fontFamily: 'monospace' }}>
          
          <header style={{ 
            padding: '20px 40px', borderBottom: '1px solid rgba(0, 212, 255, 0.3)', 
            backgroundColor: 'rgba(2, 2, 4, 0.98)', position: 'sticky', top: 0, zIndex: 100,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div onClick={() => setView("home")} style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '5px', color: '#00d4ff' }}>FOUNDATION</div>
              <div style={{ fontSize: '8px', letterSpacing: '2px', opacity: 0.6 }}>INTEL CONGLOMERATE</div>
            </div>
            
            <nav style={{ display: 'flex', gap: '30px' }}>
              {["HOME", "INTELLIGENCE", "ADVERTISE", "MISSION"].map(item => (
                <button 
                  key={item} onClick={() => setView(item.toLowerCase())}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: view === item.toLowerCase() ? '#00d4ff' : '#666',
                    fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px',
                    transition: '0.3s', borderBottom: view === item.toLowerCase() ? '2px solid #00d4ff' : '2px solid transparent'
                  }}
                >{item}</button>
              ))}
            </nav>
          </header>

          <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
            <AnimatePresence mode="wait">
              
              {view === "home" && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                  <DataCore />
                  <h2 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '10px' }}>THE APEX OF DATA</h2>
                  <p style={{ color: '#00d4ff', fontSize: '14px', letterSpacing: '10px', marginBottom: '50px' }}>EFFICIENCY // CLARITY // POWER</p>
                  <div style={{ maxWidth: '700px', margin: '0 auto', padding: '30px', border: '1px solid rgba(0, 212, 255, 0.2)', background: 'rgba(0, 212, 255, 0.03)' }}>
                    <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#ccc' }}>
                      "Foundation is the world's first high-frequency intelligence filter. We don't just report news; we provide the blueprint for the next 24 hours."
                    </p>
                  </div>
                  <button onClick={() => setView("intelligence")} style={{
                    marginTop: '60px', padding: '20px 60px', backgroundColor: '#00d4ff', color: '#000', 
                    border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '14px', letterSpacing: '3px'
                  }}>INITIALIZE GRID</button>
                </motion.div>
              )}

              {view === "intelligence" && (
                <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)} style={{
                        padding: '12px 24px', background: category === cat ? '#00d4ff' : 'transparent',
                        color: category === cat ? '#000' : '#888', border: '1px solid #333',
                        cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase'
                      }}>{cat}</button>
                    ))}
                  </div>
                  {/* Container ensures visibility against black background */}
                  <div style={{ color: '#ffffff' }}>
                    <Feed key={category} category={category} />
                  </div>
                </motion.div>
              )}

              {view === "advertise" && (
                <motion.div key="ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px' }}>
                    <div>
                      <h2 style={{ color: '#00d4ff', fontSize: '42px', marginBottom: '30px' }}>STRATEGIC PLACEMENT</h2>
                      <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#bbb' }}>Foundation is the destination for the world's most disciplined minds. By advertising here, you aren't fighting for attention; you are becoming part of a high-value workflow.</p>
                      
                      <h3 style={{ marginTop: '40px', color: '#00d4ff' }}>ADVERTISING CHANNELS:</h3>
                      <div style={{ marginTop: '20px' }}>
                        <div style={{ marginBottom: '25px' }}>
                          <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>01 / NATIVE INTELLIGENCE:</span>
                          <p style={{ color: '#888', fontSize: '14px' }}>Sponsored briefing cards styled exactly like news, providing 100% engagement rates with the reader's focus.</p>
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                          <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>02 / KINETIC VISUALS:</span>
                          <p style={{ color: '#888', fontSize: '14px' }}>Full-width 4K video segments between news cycles. Ideal for luxury brands and high-end hardware.</p>
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                          <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>03 / LINGUISTIC DOMINANCE:</span>
                          <p style={{ color: '#888', fontSize: '14px' }}>Your campaign translated across English, Spanish, Chinese, Persian, and Hindi, reaching 3.5 billion people natively.</p>
                        </div>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#08080c', padding: '40px', border: '1px solid #00d4ff', boxShadow: '0 0 30px rgba(0, 212, 255, 0.1)' }}>
                      <h4 style={{ letterSpacing: '2px' }}>THE PARTNERSHIP ENQUIRY</h4>
                      <p style={{ fontSize: '13px', color: '#666', marginTop: '20px' }}>We accept partners who align with our mission of efficiency. If your product saves time or increases capability, we want to hear from you.</p>
                      <div style={{ marginTop: '40px', padding: '20px', border: '1px dashed #333', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#888' }}>SECURE LINE</div>
                        <div style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '18px' }}>PARTNERS@FOUNDATION.IO</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "mission" && (
                <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 style={{ color: '#00d4ff', textAlign: 'center', fontSize: '38px' }}>THE UTILITY OF TRUTH</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '50px' }}>
                    <div style={{ padding: '30px', background: '#08080c', borderLeft: '3px solid #00d4ff' }}>
                      <h5 style={{ color: '#00d4ff' }}>BUSINESS / CAPITAL</h5>
                      <p style={{ fontSize: '13px', color: '#888' }}>We eliminate hype to reveal market reality. Protecting your capital by identifying global shifts before they become mainstream noise.</p>
                    </div>
                    <div style={{ padding: '30px', background: '#08080c', borderLeft: '3px solid #00d4ff' }}>
                      <h5 style={{ color: '#00d4ff' }}>SCIENCE / EVOLUTION</h5>
                      <p style={{ fontSize: '13px', color: '#888' }}>Tracking the edge of human knowledge. We bring you breakthroughs in medicine and physics that directly affect longevity and potential.</p>
                    </div>
                    <div style={{ padding: '30px', background: '#08080c', borderLeft: '3px solid #00d4ff' }}>
                      <h5 style={{ color: '#00d4ff' }}>TECHNOLOGY / SOVEREIGNTY</h5>
                      <p style={{ fontSize: '13px', color: '#888' }}>In an AI-driven world, knowledge is the only defense. We provide the intel to ensure you remain the architect of your own tech-ecosystem.</p>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '80px', textAlign: 'center', border: '1px solid #222', padding: '60px' }}>
                    <h3 style={{ letterSpacing: '5px' }}>SUSTAIN THE GRID</h3>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Foundation is independent. We are funded by the people who value their time.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                      <button style={tierStyle}>$10 INITIATE</button>
                      <button style={tierStyle}>$50 SENTINEL</button>
                      <button style={{ ...tierStyle, background: '#00d4ff', color: '#000' }}>$500 ARCHITECT</button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </div>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}

const tierStyle = {
  padding: '15px 30px', background: 'none', border: '1px solid #00d4ff', 
  color: '#00d4ff', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
};