import React, { useState, useEffect, useRef } from 'react';
import bgMusicFile from './assets/Bayanko.mp3';

// --- ENRICHED DATA ---
const timelineData = [
  {
    id: 'I',
    title: 'Foundations of Consciousness',
    shortDesc: 'The Moth, The Injustice, and The Martyrdom.',
    significance: 'Rizal’s childhood in Calamba was idyllic until reality shattered it. In 1871, his mother, Teodora Alonso, was unjustly imprisoned for two years on false charges, forcing him to witness the cruelty of colonial power. The following year, the execution of the priests GOMBURZA (1872) for alleged subversion marked the end of his innocence. His brother Paciano, a friend of Father Burgos, was distraught. At 11 years old, Jose did not yet understand politics, but he felt the pain. These traumas planted the seed of the "Social Cancer" he would later diagnose.',
    year: '1861 - 1872',
    category: 'Formation',
    source: 'Ref: Guerrero, L. M. (1961). The First Filipino.',
    type: 'main'
  },
  {
    id: 'II',
    title: 'Sa Aking Mga Kababata',
    shortDesc: 'The first assertion of identity.',
    significance: 'Written when he was allegedly only eight years old (though historians debate the exact date), this poem represents the earliest manifestation of his nationalist consciousness. He asserted that a people who truly love their native language will surely strive for liberty "like the bird which soars to freer space above." It was a rejection of the idea that Tagalog was inferior to Latin or Spanish.',
    year: '1869',
    category: 'Early Expression',
    source: 'Ref: National Historical Commission of the Philippines.',
    type: 'main'
  },
  {
    id: 'D-1',
    title: 'Consuelo Ortiga y Perez',
    shortDesc: 'Sacrificing romance for brotherhood.',
    significance: 'In Madrid, the lonely Rizal frequented the home of Don Pablo Ortiga. He wrote a poem for Don Pablo’s daughter, Consuelo, titled "A La Señorita C.O.y.P." and they began a tentative romance. However, Rizal abruptly backed away. He sacrificed his feelings for two reasons: his lingering engagement to Leonor Rivera back home, and more importantly, his friend Eduardo de Lete was madly in love with Consuelo. He valued the unity of the propagandists over his own romantic happiness.',
    year: '1882 - 1883',
    category: 'Romantic Detour',
    source: 'Ref: Zaide, G. F. (1999). Jose Rizal: Life, Works, and Writings.',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-2',
    title: 'The Ophthalmic Surgeon',
    shortDesc: 'A son’s duty to his mother.',
    significance: 'While his peers were partying or discussing politics, Rizal detoured into intense medical specialization. He trained under Dr. Louis de Wecker in Paris and Dr. Otto Becker in Heidelberg. His primary motivation was deeply personal: his mother’s eyesight was failing due to cataracts. This detour proves that before he was a hero of the state, he was a devoted son. He eventually operated on her successfully in Calamba (1887) and Hong Kong (1892).',
    year: '1885',
    category: 'Career Detour',
    source: 'Ref: Bantug, J. P. (1953). Rizal: Scholar and Scientist.',
    type: 'detour',
    alignment: 'right'
  },
  {
    id: 'III',
    title: 'Noli Me Tangere',
    shortDesc: 'Diagnosis of the Social Cancer.',
    significance: 'Published in Berlin with the financial help of Maximo Viola, the "Noli" was an explosion. It did not just criticize; it exposed. Through characters like Crisostomo Ibarra (the idealist), Maria Clara (the traditional woman), and Padre Damaso (the abuse of power), Rizal stripped the mask off the colony. He argued that the Philippines was suffering from a "social cancer" that could not be cured if hidden. The book was immediately banned by the Friars, making Rizal a marked man.',
    year: '1887',
    category: 'The Awakening',
    source: 'Ref: Schumacher, J. N. (1991). The Propaganda Movement.',
    type: 'main'
  },
  {
    id: 'D-3',
    title: 'The Japanese Temptation',
    shortDesc: 'O Sei-San and the offer of a quiet life.',
    significance: 'In Tokyo, Rizal found a rare peace. He fell deeply in love with O Sei-San (Seiko Usui), a samurai’s daughter who taught him Japanese (Suiboku) painting and the language. He was offered a stable job at the Spanish Legation. He wrote in his diary: "I have stayed here longer than I intended... I have the love of a noble woman." He could have vanished into a quiet life in Japan, safe from the friars. But his duty to the Philippines forced him to leave her, a decision that broke his heart.',
    year: '1888',
    category: 'Romantic Detour',
    source: 'Ref: Zaide, G. F. (1999).',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-4',
    title: 'Gertrude Beckett',
    shortDesc: 'Fleeing domestic temptation.',
    significance: 'While staying in London to annotate Morga’s "Sucesos", Rizal boarded with the Beckett family. The eldest daughter, "Gettie", fell for him and assisted in his artwork. Rizal felt the pull of a comfortable, domestic English life. Realizing that a relationship would distract him from his mission and potentially anger her family, he "ran away" to Paris. He left a carving of the Beckett sisters as a parting gift, choosing solitude over comfort once again.',
    year: '1889',
    category: 'Personal Detour',
    source: 'Ref: Coates, A. (1968). Rizal: Philippine Nationalist and Martyr.',
    type: 'detour',
    alignment: 'right'
  },
  {
    id: 'IV',
    title: 'Letter to the Women of Malolos',
    shortDesc: 'Reason over blind faith.',
    significance: 'When a group of women in Malolos petitioned to open a night school to learn Spanish (defying the local curate), Rizal was overjoyed. He wrote this famous letter to encourage them. He argued that a woman’s value is not in blind obedience to the church, but in raising children with dignity and critical thinking. "God gave each individual reason and a will of his or her own to distinguish the just from the unjust." It was a feminist manifesto ahead of its time.',
    year: '1889',
    category: 'Social Reform',
    source: 'Ref: Political Writings (NHCP).',
    type: 'main'
  },
  {
    id: 'D-5',
    title: 'The Loss of Leonor Rivera',
    shortDesc: 'The heartbreak that fueled the art.',
    significance: 'For 11 years, Leonor Rivera was Rizal\'s anchor. In 1890, he received a letter stating she was marrying the Englishman Charles Kipping. Her mother had intercepted Rizal’s letters for years, making Leonor think he had forgotten her. Rizal cried like a child upon hearing the news. This devastation darkened his worldview. Historians argue that this heartbreak transitioned him from the idealistic Ibarra of the "Noli" to the cynical, revenge-driven Simoun of the "Fili".',
    year: '1890',
    category: 'Emotional Detour',
    source: 'Ref: Zaide, G. F. (1999).',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-6',
    title: 'The Boustead Affair',
    shortDesc: 'Almost changing religion for love.',
    significance: 'In Biarritz, France, Rizal found solace with the Boustead family. He proposed to Nellie Boustead, a wealthy, educated Protestant. She was willing to marry him, but on one condition: he must convert to Protestantism. Rizal, though critical of the Catholic friars, refused to trade his personal convictions for marriage. The relationship ended, and he left Biarritz to finish the "El Filibusterismo" in solitude.',
    year: '1891',
    category: 'Religious Detour',
    source: 'Ref: Coates, A. (1968).',
    type: 'detour',
    alignment: 'right'
  },
  {
    id: 'V',
    title: 'El Filibusterismo',
    shortDesc: 'The failure of premature revolution.',
    significance: 'If Noli was a romance, Fili was a tragedy. Dedicated to GOMBURZA, it is a dark, angry novel. Simoun, the protagonist, tries to incite a revolution not out of love, but out of hate and vengeance. The plan fails. Through Father Florentino, Rizal delivers his verdict: The Philippines is not yet ready for independence because the slaves of today will just become the tyrants of tomorrow. "Redemption presupposes virtue, sacrifice, and love."',
    year: '1891',
    category: 'Radicalization',
    source: 'Ref: Locsin, M. (Trans.) (1996).',
    type: 'main'
  },
  {
    id: 'D-7',
    title: 'The Hong Kong Surgeon',
    shortDesc: 'The successful life he abandoned.',
    significance: 'Frustrated by politics in Europe, Rizal moved to Hong Kong. He reunited his family there and set up a clinic. He became a very successful ophthalmic surgeon, with patients flocking from all over Asia. He was wealthy, safe, and surrounded by family. He could have stayed there forever. However, the news of the continued persecution of his townmates in Calamba gnawed at him. He abandoned this "safe haven" to return to the Philippines, knowing it was likely a death trap.',
    year: '1891 - 1892',
    category: 'Professional Detour',
    source: 'Ref: Ocampo, A. R. (2012). Rizal Without the Overcoat.',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'VI',
    title: 'La Liga Filipina',
    shortDesc: 'Unus Instar Omnium (One Like All).',
    significance: 'Upon returning to Manila, Rizal established the La Liga Filipina in a house in Tondo. Unlike the propaganda movement in Spain which asked for assimilation, the Liga was a localized, self-help organization. Its aim was the "Unification of the whole archipelago into a vigorous, compact body." It advocated for mutual protection, defense against violence, and education. It was the blueprint for a united nation, but Rizal was arrested just days after its founding.',
    year: '1892',
    category: 'Organization',
    source: 'Ref: Zaide, G. F. (1999).',
    type: 'main'
  },
  {
    id: 'D-8',
    title: 'The Merchant & Scientist',
    shortDesc: 'Building a Utopia in Dapitan.',
    significance: 'Exiled to distant Dapitan, Rizal did not despair. He bought land and became a farmer and hemp trader (profiting significantly). He built a waterworks system, a school for local boys, and discovered rare species (Draco rizali, Apogonia rizali). He proved that even without a revolution, a Filipino could improve his community through science, commerce, and education. It was his practical demonstration of the "Enlightened Filipino".',
    year: '1892 - 1896',
    category: 'Renaissance Detour',
    source: 'Ref: Bantug, J. P. (1953).',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-9',
    title: 'Josephine Bracken',
    shortDesc: 'Love in the final hour.',
    significance: 'In his isolation, an 18-year-old Irish girl brought her blind adoptive father to Rizal for treatment. Rizal and Josephine fell in love. The local priest refused to marry them without a retraction of Rizal\'s political views. Rizal refused. Defying the church, they held hands and married themselves before God. She became his "unhappy wife," suffering a miscarriage and staying with him until the very end. It was his final act of personal rebellion.',
    year: '1895 - 1896',
    category: 'Final Detour',
    source: 'Ref: Ocampo, A. R. (2012).',
    type: 'detour',
    alignment: 'right'
  },
  {
    id: 'VII',
    title: 'Mi Último Adiós',
    shortDesc: 'The ultimate sacrifice.',
    significance: 'Imprisoned in Fort Santiago and facing the firing squad, Rizal wrote his final poem (hidden inside an alcohol lamp). "Mi Último Adiós" is not just a goodbye; it is a final offering. He writes, "I die just when I see the dawn break." He accepted that his death was the necessary catalyst to unite the people. On December 30, 1896, his pulse was normal before the shots rang out. He twisted his body to fall facing the sky, proving he was no traitor.',
    year: '1896',
    category: 'Martyrdom',
    source: 'Ref: Ocampo, A. R. (2012).',
    type: 'main'
  }
];

// --- STYLES ---
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

:root {
  --bg-paper: #f0ebe0;
  --card-bg: rgba(253, 251, 247, 0.98);
  --ink: #2b2b2b;
  --gold: #c5a059;
  --red: #8a2323;
  --blue-mute: #34495e;
  --gray: #555;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background-color: var(--bg-paper);
  color: var(--ink);
  font-family: 'Playfair Display', serif;
  overflow-x: hidden;
}

/* Texture Overlay */
.app-main-wrapper {
  background-image: url("https://www.transparenttextures.com/patterns/aged-paper.png");
  min-height: 100vh;
  position: relative;
  transition: all 0.5s ease;
}

/* --- Floating Navigation & Controls --- */
.control-panel {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  gap: 15px;
  background: rgba(20, 20, 20, 0.90);
  padding: 12px 30px;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.mode-btn {
  background: transparent;
  border: none;
  color: #aaa;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.mode-btn.active {
  background: var(--gold);
  color: var(--ink);
  font-weight: bold;
}

.icon-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 8px;
  position: relative;
}

.icon-btn.active {
  background: var(--red);
  border-color: var(--red);
  box-shadow: 0 0 15px rgba(138, 35, 35, 0.5);
}
.icon-btn:hover { background: rgba(255, 255, 255, 0.1); }
.icon-btn svg { width: 100%; height: 100%; fill: currentColor; }

/* --- Hero Section --- */
.hero-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-title {
  font-family: 'Cinzel Decorative', serif;
  font-size: 5rem;
  color: var(--ink);
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 50px;
}

.start-btn {
  background: transparent;
  border: 2px solid var(--red);
  color: var(--red);
  padding: 15px 40px;
  font-family: 'Cinzel Decorative', serif;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.start-btn:hover {
  background: var(--red);
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(138, 35, 35, 0.3);
}

/* --- TIMELINE LAYOUT --- */
.timeline-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 150px;
  padding: 150px 20px 250px 20px;
}

.spine-background {
  position: absolute;
  top: 0; bottom: 0; left: 50%;
  width: 2px;
  background: var(--gold);
  transform: translateX(-50%);
  z-index: 0;
  opacity: 0.5;
}

.timeline-row {
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* --- FOCUS MODE EFFECTS --- */
.mode-guided .timeline-row {
  opacity: 0.2;
  filter: grayscale(100%) blur(3px);
  transform: scale(0.95);
  pointer-events: none;
}

.mode-guided .timeline-row.active-step {
  opacity: 1;
  filter: grayscale(0%) blur(0);
  transform: scale(1.02);
  pointer-events: auto;
  z-index: 10;
}

/* --- Card Styles --- */
.card {
  background: var(--card-bg);
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  transition: all 0.5s ease;
  cursor: pointer;
  border: 1px solid rgba(197, 160, 89, 0.2);
  backdrop-filter: blur(5px);
  position: relative;
}

/* Card Alignments & Sizes */
.card-main { 
  grid-column: 1 / -1; 
  justify-self: center; 
  width: 100%; 
  max-width: 700px; /* Wider for more text */
  text-align: center; 
  border-top: 5px solid var(--gold); 
}

.detour-left .card { 
  grid-column: 1; 
  justify-self: end; 
  transform: rotate(-1deg);
  max-width: 480px; /* Wider for more text */
  text-align: right;
}

.detour-right .card { 
  grid-column: 3; 
  justify-self: start; 
  transform: rotate(1deg);
  max-width: 480px; /* Wider for more text */
  text-align: left;
}

/* Typography */
.detour-badge {
  display: inline-block;
  background: var(--red);
  color: white;
  padding: 4px 12px;
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 2px;
  margin-bottom: 15px;
}

h3 {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin: 10px 0;
  color: var(--ink);
  line-height: 1.1;
}

.desc {
  font-family: 'Lato', sans-serif;
  font-style: italic;
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 25px;
}

.significance {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--ink);
  margin-bottom: 20px;
  text-align: justify; /* Cleaner look for long text */
}

/* Footer / Reference Section */
.card-footer {
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 15px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.meta-year {
    font-family: 'Cinzel Decorative', serif;
    color: var(--gold);
    font-size: 1.1rem;
    font-weight: bold;
}

.meta-source {
    font-family: 'Lato', sans-serif;
    font-size: 0.8rem;
    color: #888;
    font-style: italic;
    opacity: 0.8;
}

/* --- AUTOPLAY TOP BAR --- */
.autoplay-bar-wrapper {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 6px;
  z-index: 2000;
  background: rgba(0,0,0,0.1);
}
.autoplay-bar {
  height: 100%;
  background: var(--red);
  width: 0%;
  box-shadow: 0 0 10px var(--red);
}
@keyframes fillTime {
  from { width: 0%; }
  to { width: 100%; }
}
.autoplay-active .autoplay-bar {
  animation: fillTime 15s linear forwards; 
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .hero-title { font-size: 3rem; }
  .timeline-row { display: flex; flex-direction: column; gap: 20px; padding-bottom: 40px; }
  .spine-background { left: 20px; }
  
  .card-main, .detour-left .card, .detour-right .card { 
    margin-left: 40px; 
    width: calc(100% - 60px); 
    max-width: none;
    transform: none; 
    text-align: left; 
  }
  .significance { text-align: left; }
  .detour-left .card { text-align: left; }
}
`;

function App() {
  const [viewMode, setViewMode] = useState('hero');
  const [guidedIndex, setGuidedIndex] = useState(0);

  // State for features
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Refs
  const itemRefs = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      if (isMusicPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const handleStart = (mode) => {
    setViewMode(mode);
    setIsMusicPlaying(true);
    setGuidedIndex(0);
  };

  useEffect(() => {
    window.speechSynthesis.cancel();
    if (isTTSEnabled && viewMode === 'guided') {
      const item = timelineData[guidedIndex];
      // Updated TTS to read the longer descriptions
      const textToSpeak = `${item.title}. ${item.significance}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [guidedIndex, isTTSEnabled, viewMode]);

  useEffect(() => {
    let interval;
    // Increased Autoplay time to 15s to account for reading longer text
    if (isAutoPlay && viewMode === 'guided' && guidedIndex < timelineData.length - 1) {
      interval = setInterval(() => {
         nextStep();
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, guidedIndex, viewMode]);

  useEffect(() => {
    if (viewMode === 'guided') {
      const targetRef = itemRefs.current[guidedIndex];
      if (targetRef) {
        targetRef.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }
  }, [guidedIndex, viewMode]);


  const nextStep = () => {
    if (guidedIndex < timelineData.length - 1) {
      setGuidedIndex(prev => prev + 1);
    } else {
      setIsAutoPlay(false);
    }
  };

  const prevStep = () => {
    if (guidedIndex > 0) {
      setGuidedIndex(prev => prev - 1);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <audio ref={audioRef} src={bgMusicFile} loop />

      <div className={`app-main-wrapper ${viewMode === 'guided' ? 'mode-guided' : ''}`}>

        {viewMode === 'hero' ? (
          <div className="hero-wrapper">
            <h1 className="hero-title">Rizal Archives</h1>
            <p className="hero-subtitle">An Interactive Journey through Ideology & Sacrifice</p>
            <div style={{display: 'flex', gap: '20px'}}>
              <button className="start-btn" onClick={() => handleStart('guided')}>Start Guided Tour</button>
              <button className="start-btn" onClick={() => handleStart('manual')} style={{borderColor: '#2b2b2b', color: '#2b2b2b'}}>Explore Freely</button>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'guided' && isAutoPlay && (
                <div className={`autoplay-bar-wrapper ${isAutoPlay ? 'autoplay-active' : ''}`} key={guidedIndex}>
                    <div className="autoplay-bar"></div>
                </div>
            )}

            <div className="timeline-container">
              <div className="spine-background"></div>

              <div className="hero-text" style={{textAlign: 'center', marginBottom: '50px', opacity: viewMode === 'guided' ? 0.5 : 1}}>
                <h1 style={{fontFamily:'Cinzel Decorative'}}>The Timeline</h1>
                <p style={{fontFamily:'Lato', color:'#666'}}>
                    {viewMode === 'guided' ? 'Focus Mode: Auto-scrolling...' : 'Scroll to explore the path.'}
                </p>
              </div>

              {timelineData.map((item, index) => {
                const isDetour = item.type === 'detour';
                const isActive = index === guidedIndex;

                return (
                  <div
                    key={item.id}
                    ref={el => itemRefs.current[index] = el}
                    className={`timeline-row ${isDetour ? `detour-${item.alignment}` : 'main-event'} ${isActive ? 'active-step' : ''}`}
                    onClick={() => {
                        if(viewMode === 'guided') setGuidedIndex(index);
                    }}
                  >
                    <div className={`card ${isDetour ? 'card-detour' : 'card-main'}`}>
                      {isDetour && <span className="detour-badge">{item.category}</span>}
                      <h3>{item.title}</h3>
                      <p className="desc">{item.shortDesc}</p>
                      <p className="significance">{item.significance}</p>

                      {/* NEW FOOTER SECTION FOR REFERENCES */}
                      <div className="card-footer">
                        <span className="meta-year">{item.year}</span>
                        <span className="meta-source">{item.source}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {viewMode !== 'hero' && (
          <div className="control-panel">

            {viewMode === 'guided' && (
                <button className="icon-btn" onClick={prevStep} disabled={guidedIndex === 0}>
                    <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
                </button>
            )}

            <button
              className={`mode-btn ${viewMode === 'guided' ? 'active' : ''}`}
              onClick={() => { setViewMode('guided'); setIsAutoPlay(false); }}
            >
              Focus Mode
            </button>
            <button
              className={`mode-btn ${viewMode === 'manual' ? 'active' : ''}`}
              onClick={() => { setViewMode('manual'); setIsAutoPlay(false); }}
            >
              Free Roam
            </button>

            {viewMode === 'guided' && (
                <>
                <div style={{width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)', margin: '0 5px'}}></div>
                <button
                    className={`icon-btn ${isAutoPlay ? 'active' : ''}`}
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    title={isAutoPlay ? "Pause Autoplay" : "Start Autoplay"}
                >
                    {isAutoPlay ? (
                    <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    ) : (
                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    )}
                </button>
                <button className="icon-btn" onClick={nextStep} disabled={guidedIndex === timelineData.length - 1}>
                    <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
                </button>
                </>
            )}

            <div style={{width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)', margin: '0 5px'}}></div>

            <button
              className={`icon-btn ${isMusicPlaying ? 'active' : ''}`}
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              title="Music"
            >
               {isMusicPlaying ? (
                 <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
               ) : (
                 <svg viewBox="0 0 24 24"><path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73L19.73 21 21 19.73 4.27 3zM14 7h4V3h-6v5.18l2 2z"/></svg>
               )}
            </button>

            {viewMode === 'guided' && (
                <button
                className={`icon-btn ${isTTSEnabled ? 'active' : ''}`}
                onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                title="Narrator"
                >
                <svg viewBox="0 0 24 24">
                    <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21 1.01.33 2.05.33 3.1 0 3.95-3.23 7.16-7.16 7.16h-.84z"/>
                </svg>
                </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;