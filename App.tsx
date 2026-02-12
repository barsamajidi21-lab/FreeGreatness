import { useState, Suspense } from "react";
import Feed from "./Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageContext } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Html } from "@react-three/drei";

// SPEED: Optimized QueryClient with aggressive staleTime to prevent redundant re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const RotatingEarth = () => {
  const questions = [
    "WILL AI REDEFINE YOUR BIOLOGY?", "THE 2026 CRASH: TRUTH OR NOISE?",
    "TRUMP'S NEXT MOVE: GLOBAL IMPACT?", "CRYPTO BLEEDING: THE FINAL SHAKEOUT?",
    "LIFE-CHANGING TECH: ARE YOU READY?", "PROTESTS & POWER: THE NEW WORLD ORDER?",
    "IS PRIVACY OFFICIALLY DEAD?", "NEXT GEN ENERGY: FUSION OR FAILURE?",
    "CAN WE REVERSE AGING BY 2030?", "THE DOLLAR'S FATE: WHAT'S NEXT?",
    "MARS COLONIZATION: REALITY CHECK?", "QUANTUM COMPUTING: END OF ENCRYPTION?",
    "THE RISE OF THE SEABOARD MEGALOPOLIS?", "GENETIC EDITING: THE DESIGNER ERA?",
    "DEEPFAKES: CAN WE TRUST OUR EYES?", "THE FUTURE OF WORK: 4-DAY WEEKS?",
    "AI GOVERNANCE: WHO IS IN CONTROL?", "UNIVERSAL BASIC INCOME: THE CURE?",
    "NEURALINK: CONNECTING TO THE GRID?", "THE END OF SCARCITY: PRINTING FOOD?"
  ];

  const totalCycleTime = (questions.length / 2) * 3; 

  return (
    <div style={{ height: '350px', width: '100%', cursor: 'grab', marginBottom: '10px' }}>
      <Canvas camera={{ position: [0, 0, 5.5] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[2, 64, 64]}>
              <MeshDistortMaterial color="#00a8ff" attach="material" distort={0.4} speed={2} roughness={0.1} metalness={0.9} />
              {questions.map((q, i) => {
                const pairIndex = Math.floor(i / 2);
                const isLeft = i % 2 === 0;
                return (
                  <Html key={i} position={[isLeft ? -3.2 : 3.2, isLeft ? 0.8 : -0.8, 0]} center>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: totalCycleTime - 3, delay: pairIndex * 3, ease: "easeInOut", times: [0, 0.1, 0.85, 1] }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)', padding: '10px 18px', borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0,168,255,0.2)', border: '1px solid #00a8ff',
                        whiteSpace: 'nowrap', color: '#1a1a1a', fontWeight: '900', fontSize: '11px',
                        letterSpacing: '1px', backdropFilter: 'blur(10px)', zIndex: 10
                      }}
                    >
                      {q}
                    </motion.div>
                  </Html>
                );
              })}
            </Sphere>
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      </Canvas>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["general", "business", "technology", "science", "health", "sports", "entertainment"];

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <style>{`
          @keyframes bluePulse {
            0% { box-shadow: 0 0 10px rgba(0, 168, 255, 0.1); transform: translateY(0px); }
            50% { box-shadow: 0 0 15px rgba(0, 168, 255, 0.3); transform: translateY(-1px); }
            100% { box-shadow: 0 0 10px rgba(0, 168, 255, 0.1); transform: translateY(0px); }
          }
          .living-search {
            width: clamp(260px, 60vw, 550px); 
            padding: 15px 25px;
            font-size: 15px;
            border-radius: 50px;
            border: 2px solid rgba(0, 168, 255, 0.1);
            background: white;
            outline: none;
            transition: all 0.4s ease;
            animation: bluePulse 4s infinite ease-in-out;
            font-weight: 600;
            text-align: center;
          }
          .ad-card {
            background: white;
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.03);
            border: 1px solid rgba(0, 168, 255, 0.08);
            flex: 1;
            min-width: 250px;
            transition: 0.3s;
          }
          .ad-card:hover {
            transform: translateY(-5px);
            border-color: #00a8ff;
          }
          footer a { color: #00a8ff; text-decoration: none; font-weight: bold; }
        `}</style>

        <div style={{ minHeight: '100vh', backgroundColor: '#f0f7ff', color: '#2d3436', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
          
          <header style={{ 
            padding: '15px 40px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(15px)',
            position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 2px 20px rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0, 168, 255, 0.1)'
          }}>
            <div onClick={() => setView("home")} style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#00a8ff' }}>FreeGreatness</div>
              <div style={{ fontSize: '9px', color: '#636e72', fontWeight: 'bold' }}>GLOBAL INTELLIGENCE</div>
            </div>
            <nav style={{ display: 'flex', gap: '20px' }}>
              {["HOME", "INTELLIGENCE", "ADVERTISE", "MISSION"].map(item => (
                <button key={item} onClick={() => setView(item.toLowerCase())}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: view === item.toLowerCase() ? '#00a8ff' : '#636e72',
                    fontSize: '12px', fontWeight: '700',
                    borderBottom: view === item.toLowerCase() ? '2px solid #00a8ff' : '2px solid transparent'
                  }}
                >{item}</button>
              ))}
            </nav>
          </header>

          <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', flex: 1, width: '100%' }}>
            
            {view !== "mission" && view !== "advertise" && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <input 
                  type="text" 
                  placeholder="SEARCH THE GLOBAL STREAM..." 
                  className="living-search" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {view === "home" && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                  <RotatingEarth />
                  <h2 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: '900', color: '#1a1a1a', margin: '0 0 5px 0' }}>FREE GREATNESS</h2>
                  <p style={{ color: '#00a8ff', fontSize: '13px', fontWeight: '800', letterSpacing: '8px', marginBottom: '25px' }}>CLARITY</p>
                  <button onClick={() => setView("intelligence")} style={{
                    padding: '18px 50px', backgroundColor: '#00a8ff', color: '#fff', borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '15px', boxShadow: '0 8px 25px rgba(0, 168, 255, 0.3)'
                  }}>FIGURE OUT</button>
                </motion.div>
              )}

              {view === "intelligence" && (
                <motion.div key="intelligence" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' }}>
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)} style={{
                        padding: '10px 20px', borderRadius: '50px', background: category === cat ? '#00a8ff' : '#fff', color: category === cat ? '#fff' : '#636e72', border: 'none', boxShadow: '0 3px 10px rgba(0,0,0,0.03)', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase'
                      }}>{cat}</button>
                    ))}
                  </div>
                  <Feed key={category} category={category} searchBarQuery={searchQuery} />
                </motion.div>
              )}

              {view === "advertise" && (
                <motion.div key="advertise" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '30px 20px' }}>
                  <h2 style={{ fontSize: '42px', fontWeight: '900', color: '#1a1a1a' }}>PARTNER WITH GREATNESS</h2>
                  <p style={{ color: '#636e72', fontSize: '18px', maxWidth: '700px', margin: '15px auto' }}>Put your brand in front of the world's most informed minds.</p>
                  
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '40px', textAlign: 'left' }}>
                    <div className="ad-card">
                      <div style={{ fontSize: '20px', marginBottom: '10px' }}>🖼️</div>
                      <h3 style={{ fontWeight: '900', color: '#00a8ff', fontSize: '16px' }}>Visual Impact</h3>
                      <p style={{ color: '#636e72', fontSize: '13px' }}>Image banners integrated into the news feed.</p>
                    </div>
                    <div className="ad-card">
                      <div style={{ fontSize: '20px', marginBottom: '10px' }}>🎥</div>
                      <h3 style={{ fontWeight: '900', color: '#00a8ff', fontSize: '16px' }}>Video Spotlight</h3>
                      <p style={{ color: '#636e72', fontSize: '13px' }}>Cinematic video ads for maximum engagement.</p>
                    </div>
                    <div className="ad-card">
                      <div style={{ fontSize: '20px', marginBottom: '10px' }}>✍️</div>
                      <h3 style={{ fontWeight: '900', color: '#00a8ff', fontSize: '16px' }}>Sponsored Intel</h3>
                      <p style={{ color: '#636e72', fontSize: '13px' }}>Native text ads that provide deep value.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "mission" && (
                <motion.div key="mission" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ padding: '40px 20px', textAlign: 'center' }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px' }}>OUR MISSION</h2>
                    <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#2d3436' }}>
                      At FreeGreatness, we believe that high-level intelligence shouldn't be gated. 
                      Our mission is to provide you with <strong>clarity</strong> to navigate global change.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* --- GLOBAL LEGAL FOOTER --- */}
          <footer style={{ 
            backgroundColor: '#fff', 
            padding: '40px 20px', 
            borderTop: '1px solid rgba(0, 168, 255, 0.1)', 
            textAlign: 'center',
            marginTop: '50px'
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#00a8ff', marginBottom: '10px' }}>FREEGREATNESS</div>
              <p style={{ fontSize: '11px', color: '#95a5a6', lineHeight: '1.6', marginBottom: '20px' }}>
                <strong>DISCLAIMER:</strong> The intelligence provided on this platform is for informational and educational purposes only. 
                FreeGreatness does not provide financial, medical, legal, or political advice. All information is gathered from third-party 
                sources and processed for clarity; however, we do not guarantee the accuracy or completeness of any report. 
                Always consult with a qualified professional before making significant life or financial decisions based on news content.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#636e72' }}>
                <span>© 2026 FREEGREATNESS</span>
                <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
                <span style={{ cursor: 'pointer' }}>Terms of Service</span>
              </div>
            </div>
          </footer>
        </div>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}