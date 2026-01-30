import { useState, Suspense } from "react";
import Feed from "./Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageContext } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Html } from "@react-three/drei";

const queryClient = new QueryClient();

// --- THE HOOK: SYNCED PAIRS OF QUESTIONS ---
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

  // Total pairs = 10. Each pair takes 3 seconds total (2.5 visible + 0.5 transition)
  const totalCycleTime = (questions.length / 2) * 3; 

  return (
    <div style={{ height: 'clamp(400px, 60vh, 600px)', width: '100%', cursor: 'grab', marginBottom: '20px' }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[2.2, 64, 64]}>
              <MeshDistortMaterial
                color="#00a8ff"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.1}
                metalness={0.9}
              />
              {questions.map((q, i) => {
                const pairIndex = Math.floor(i / 2); // Groups 0-1, 2-3, etc.
                const isLeft = i % 2 === 0;
                
                return (
                  <Html
                    key={i}
                    position={[
                      isLeft ? -3.5 : 3.5, // Split them left and right
                      isLeft ? 1 : -1,      // Offset heights slightly
                      0
                    ]}
                    center
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        scale: [0.9, 1, 1, 0.9] 
                      }}
                      transition={{
                        duration: 3, // Total visible cycle
                        repeat: Infinity,
                        repeatDelay: totalCycleTime - 3, // Waits for all other pairs to finish
                        delay: pairIndex * 3, // Starts next pair every 3 seconds
                        ease: "easeInOut",
                        times: [0, 0.1, 0.85, 1] // Stays solid for ~2.5s
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '12px 24px',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,168,255,0.25)',
                        border: '1px solid #00a8ff',
                        whiteSpace: 'nowrap',
                        color: '#1a1a1a',
                        fontWeight: '900',
                        fontSize: '13px',
                        letterSpacing: '1px',
                        backdropFilter: 'blur(10px)',
                        zIndex: 10
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
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f7ff', color: '#2d3436', fontFamily: 'system-ui, sans-serif' }}>
          
          <header style={{ 
            padding: '20px 40px', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(15px)',
            position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 2px 20px rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0, 168, 255, 0.1)'
          }}>
            <div onClick={() => setView("home")} style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#00a8ff' }}>FreeGreatness</div>
              <div style={{ fontSize: '10px', color: '#636e72', fontWeight: 'bold' }}>GLOBAL INTELLIGENCE</div>
            </div>
            <nav style={{ display: 'flex', gap: '25px' }}>
              {["HOME", "INTELLIGENCE", "ADVERTISE", "MISSION"].map(item => (
                <button key={item} onClick={() => setView(item.toLowerCase())}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: view === item.toLowerCase() ? '#00a8ff' : '#636e72',
                    fontSize: '13px', fontWeight: '700',
                    borderBottom: view === item.toLowerCase() ? '3px solid #00a8ff' : '3px solid transparent'
                  }}
                >{item}</button>
              ))}
            </nav>
          </header>

          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
              <div className="search-wrapper">
                <input 
                  type="text" 
                  placeholder="Search global data..." 
                  className="shining-search" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {view === "home" && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                  <RotatingEarth />
                  <h2 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '900', color: '#1a1a1a', marginBottom: '10px' }}>FREE GREATNESS</h2>
                  <p style={{ color: '#00a8ff', fontSize: '14px', fontWeight: '800', letterSpacing: '10px', marginBottom: '50px' }}>CLARITY // POWER // ACCESS</p>
                  
                  <div style={{ maxWidth: '750px', margin: '0 auto', padding: '40px', borderRadius: '30px', background: 'white', boxShadow: '0 15px 50px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: '1.2rem', color: '#555', fontStyle: 'italic' }}>
                      "FreeGreatness is the world's most accessible intelligence stream. We provide the blueprint for the next 24 hours."
                    </p>
                  </div>
                  
                  <button onClick={() => setView("intelligence")} style={{
                    marginTop: '60px', padding: '22px 70px', backgroundColor: '#00a8ff', color: '#fff', 
                    borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '16px',
                    boxShadow: '0 10px 30px rgba(0, 168, 255, 0.4)', transition: '0.3s'
                  }}>ACCESS THE GLOBAL FEED</button>
                </motion.div>
              )}

              {view === "intelligence" && (
                <motion.div key="news" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '15px' }}>
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)} style={{
                        padding: '12px 25px', borderRadius: '50px',
                        background: category === cat ? '#00a8ff' : '#fff',
                        color: category === cat ? '#fff' : '#636e72', 
                        border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                        cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase'
                      }}>{cat}</button>
                    ))}
                  </div>
                  <Feed key={category} category={category} searchBarQuery={searchQuery} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}