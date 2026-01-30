import { useState, Suspense } from "react";
import Feed from "./Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageContext } from "./LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

const queryClient = new QueryClient();

// --- THE BIG ROTATING EARTH ---
const RotatingEarth = () => (
  <div style={{ height: 'clamp(300px, 50vh, 550px)', width: '100%', cursor: 'grab', marginBottom: '20px' }}>
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[2.4, 64, 64]}>
            <MeshDistortMaterial
              color="#00a8ff"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.9}
            />
          </Sphere>
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
    </Canvas>
  </div>
);

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("en");
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["general", "business", "technology", "science", "health", "sports", "entertainment"];

  const tierStyle = {
    padding: '15px 30px', background: 'white', border: '1px solid #00a8ff', 
    color: '#00a8ff', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px',
    borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={{ lang, setLang }}>
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f7ff', color: '#2d3436', fontFamily: 'system-ui, sans-serif' }}>
          
          <header className="main-header" style={{ 
            padding: '20px 40px', 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(15px)',
            position: 'sticky', top: 0, zIndex: 100,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
            borderBottom: '1px solid rgba(0, 168, 255, 0.1)',
            flexWrap: 'wrap'
          }}>
            <div onClick={() => setView("home")} style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '1px', color: '#00a8ff' }}>FreeGreatness</div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#636e72', fontWeight: 'bold' }}>GLOBAL INTELLIGENCE</div>
            </div>
            
            <nav style={{ display: 'flex', gap: '20px', padding: '10px 0' }}>
              {["HOME", "INTELLIGENCE", "ADVERTISE", "MISSION"].map(item => (
                <button 
                  key={item} onClick={() => setView(item.toLowerCase())}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: view === item.toLowerCase() ? '#00a8ff' : '#636e72',
                    fontSize: '12px', fontWeight: '700', transition: '0.3s',
                    borderBottom: view === item.toLowerCase() ? '3px solid #00a8ff' : '3px solid transparent',
                    paddingBottom: '5px'
                  }}
                >{item}</button>
              ))}
            </nav>
          </header>

          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            
            {/* 3D SHINING SEARCH BAR */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
              <div className="search-wrapper">
                <input 
                  type="text" 
                  placeholder="Search global intel..."
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
                  <h2 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: '900', color: '#1a1a1a', marginBottom: '10px' }}>FREE GREATNESS</h2>
                  <p style={{ color: '#00a8ff', fontSize: '14px', fontWeight: '800', letterSpacing: '10px', marginBottom: '50px' }}>CLARITY // POWER // ACCESS</p>
                  
                  <div style={{ maxWidth: '750px', margin: '0 auto', padding: '40px', borderRadius: '30px', background: 'white', boxShadow: '0 15px 50px rgba(0,0,0,0.06)' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#555', fontStyle: 'italic' }}>
                      "FreeGreatness is the world's most accessible intelligence stream. We don't just report news; we provide the blueprint for the next 24 hours."
                    </p>
                  </div>
                  <button onClick={() => setView("intelligence")} style={{
                    marginTop: '60px', padding: '22px 70px', backgroundColor: '#00a8ff', color: '#fff', 
                    borderRadius: '50px', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '16px',
                    boxShadow: '0 10px 30px rgba(0, 168, 255, 0.4)', transition: '0.3s'
                  }}>INITIALIZE GRID</button>
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
                        cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', whiteSpace: 'nowrap'
                      }}>{cat}</button>
                    ))}
                  </div>
                  {/* FINAL TOUCH: Added searchBarQuery prop */}
                  <Feed key={category} category={category} searchBarQuery={searchQuery} />
                </motion.div>
              )}

              {view === "advertise" && (
                <motion.div key="ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                    <div>
                      <h2 style={{ color: '#00a8ff', fontSize: '48px', marginBottom: '30px', fontWeight: '900' }}>STRATEGIC PLACEMENT</h2>
                      <p style={{ fontSize: '19px', lineHeight: '1.8', color: '#555' }}>FreeGreatness is the destination for the world's most disciplined minds.</p>
                      <div style={{ marginTop: '40px' }}>
                        {["NATIVE INTELLIGENCE", "KINETIC VISUALS", "GLOBAL DOMINANCE"].map((title, i) => (
                          <div key={i} style={{ marginBottom: '30px', padding: '20px', background: 'white', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                            <span style={{ color: '#00a8ff', fontWeight: '900' }}>0{i+1} / {title}:</span>
                            <p style={{ color: '#777', fontSize: '15px', marginTop: '5px' }}>Tailored campaign structures for maximum impact.</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '30px', border: '1px solid #00a8ff', alignSelf: 'start' }}>
                      <h4 style={{ letterSpacing: '2px', fontWeight: '900' }}>PARTNERSHIP</h4>
                      <div style={{ marginTop: '50px', padding: '25px', border: '2px dashed #00a8ff', borderRadius: '20px', textAlign: 'center' }}>
                        <div style={{ color: '#00a8ff', fontWeight: '900', fontSize: '16px', wordBreak: 'break-all' }}>PARTNERS@FREEGREATNESS.COM</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "mission" && (
                <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 style={{ color: '#00a8ff', textAlign: 'center', fontSize: '42px', fontWeight: '900' }}>THE UTILITY OF TRUTH</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginTop: '60px' }}>
                    {[{ h: "CAPITAL", p: "Eliminating market noise." }, { h: "EVOLUTION", p: "Tracking breakthroughs." }, { h: "SOVEREIGNTY", p: "Defense through knowledge." }].map((item, i) => (
                      <div key={i} style={{ padding: '40px', background: 'white', borderRadius: '25px', borderLeft: '6px solid #00a8ff', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                        <h5 style={{ color: '#00a8ff', fontWeight: '900', fontSize: '18px' }}>{item.h}</h5>
                        <p style={{ fontSize: '15px', color: '#666', marginTop: '10px' }}>{item.p}</p>
                      </div>
                    ))}
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