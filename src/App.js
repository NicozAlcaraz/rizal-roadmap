import React, { useState, useEffect, useRef } from 'react';
import bgMusicFile from './assets/Bayanko.mp3';

// --- DATA ---
const timelineData = [
  {
    id: 'I',
    title: 'Childhood & Awakening',
    shortDesc: 'The foundations of consciousness.',
    significance: 'Rizal\'s early patriotism was forged by the injustice of his mother\'s imprisonment (1871) and the execution of GOMBURZA (1872). These events awakened his mind to the "social cancer" plaguing the colony.',
    year: '1861 - 1872',
    category: 'Formation',
    source: 'Ref: Guerrero, L. M. (1961). The First Filipino.',
    type: 'main'
  },
  {
    id: 'II',
    title: 'Sa Aking Mga Kababata',
    shortDesc: 'The value of a national language.',
    significance: 'Representing his earliest assertion that a nation\'s love for its native tongue is a marker of its desire for liberty.',
    year: '1869',
    category: 'Early Expression',
    source: 'Ref: National Historical Commission of the Philippines',
    type: 'main'
  },
  {
    id: 'D-1',
    title: 'Consuelo Ortiga y Perez',
    shortDesc: 'Sacrificing love for friendship.',
    significance: 'In Madrid, Rizal fell for Consuelo, the daughter of Don Pablo Ortiga. However, he backed away for two reasons: his engagement to Leonor Rivera and his friend Eduardo de Lete\'s love for Consuelo. He chose duty and friendship over romance.',
    year: '1882 - 1883',
    category: 'Romantic Detour',
    source: 'Ref: Zaide, G. F. (1999). Jose Rizal: Life, Works, and Writings.',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-2',
    title: 'The Ophthalmic Surgeon',
    shortDesc: 'A son\'s duty to his mother.',
    significance: 'Before becoming a political firebrand, Rizal detoured into specialized medicine in Paris (under Dr. de Wecker) and Heidelberg. His primary motivation was not politics, but curing his mother\'s blindness.',
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
    significance: 'The "Noli" exposed the rot of the colonial system. Through Ibarra and Elias, Rizal presented the central political dilemma: Education vs. Revolution.',
    year: '1887',
    category: 'The Awakening',
    source: 'Ref: Schumacher, J. N. (1991). The Propaganda Movement.',
    type: 'main'
  },
  {
    id: 'D-3',
    title: 'The Japanese Temptation',
    shortDesc: 'O Sei-San and a quiet life.',
    significance: 'In Tokyo, Rizal fell in love with O Sei-San. He was offered a job at the Spanish Legation and a life of peace. He wrote: "I have stayed here longer than I intended... I have the love of a noble woman." He forced himself to leave to continue his mission.',
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
    significance: 'While annotating Morga\'s work in London, the landlord\'s daughter, "Gettie," fell for him. Realizing he was being drawn into a comfortable domestic life that would distract from his work, he abruptly left for Paris.',
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
    significance: 'Advocating for the empowerment of Filipino women through education, breaking the friars\' control over the family unit.',
    year: '1889',
    category: 'Social Reform',
    source: 'Ref: Political Writings (NHCP).',
    type: 'main'
  },
  {
    id: 'D-5',
    title: 'Loss of Leonor Rivera',
    shortDesc: 'The heartbreak that fueled the art.',
    significance: 'Rizal received news that his true love, Leonor Rivera, was marrying Charles Kipping. This immense depression nearly derailed him but eventually fueled the tragic romanticism of Simoun in El Fili.',
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
    significance: 'In Biarritz, Rizal courted Nellie Boustead. She demanded he convert to Protestantism to marry her. He refused to trade his convictions for marriage, ending the relationship and returning to his political solitude.',
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
    significance: 'Darker than the Noli, the "Fili" rejects a revolution based on hatred. "Why independence, if the slaves of today will be the tyrants of tomorrow?"',
    year: '1891',
    category: 'Radicalization',
    source: 'Ref: Locsin, M. (Trans.) (1996).',
    type: 'main'
  },
  {
    id: 'D-7',
    title: 'The Hong Kong Surgeon',
    shortDesc: 'The successful life he abandoned.',
    significance: 'Rizal reunited his family in Hong Kong and became a successful, wealthy surgeon. He could have stayed there in safety, but the call of the "Persecuted Motherland" forced him to return to the Lion\'s Den.',
    year: '1891 - 1892',
    category: 'Professional Detour',
    source: 'Ref: Ocampo, A. R. (2012). Rizal Without the Overcoat.',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-8',
    title: 'The Borneo Project',
    shortDesc: 'Giving up on the Philippines.',
    significance: 'Frustrated by the Calamba agrarian trouble, Rizal planned to move his family and townmates to North Borneo (Sabah) to found a "New Calamba" under British rule. It was a moment of giving up on reforming the Philippines directly.',
    year: '1892',
    category: 'Geopolitical Detour',
    source: 'Ref: Ocampo, A. R. (2012).',
    type: 'detour',
    alignment: 'right'
  },
  {
    id: 'VI',
    title: 'La Liga Filipina',
    shortDesc: 'Unus Instar Omnium.',
    significance: 'Rizal returned to the main path with this attempt at a peaceful, socio-civic organization in Tondo. Its goal was the "union of the archipelago".',
    year: '1892',
    category: 'Organization',
    source: 'Ref: Zaide, G. F. (1999).',
    type: 'main'
  },
  {
    id: 'D-9',
    title: 'The Merchant & Scientist',
    shortDesc: 'Hemp trading and discovering species.',
    significance: 'In exile, Rizal became a hemp trader (profiting heavily), a farmer, and a naturalist (discovering Draco rizali). These activities showed his ability to thrive outside of politics, building a utopian community in Dapitan.',
    year: '1892 - 1896',
    category: 'Renaissance Detour',
    source: 'Ref: Bantug, J. P. (1953).',
    type: 'detour',
    alignment: 'left'
  },
  {
    id: 'D-10',
    title: 'Josephine Bracken',
    shortDesc: 'Love in the final hour.',
    significance: 'The "sweet foreigner" who brought joy to his lonely exile. Their relationship was controversial (no church marriage), representing a final personal rebellion against the friars before his death.',
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
    significance: 'Written in Fort Santiago. It was the final seal on his political evolution: the willingness to die to give the nation life.',
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
  --gray: #666;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

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
  background: rgba(20, 20, 20, 0.85);
  padding: 10px 25px;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  backdrop-filter: blur(8px);
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
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

/* --- Hero Section (Landing) --- */
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
  opacity: 0;
  animation: fadeUp 1s ease forwards 0.5s;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 50px;
  opacity: 0;
  animation: fadeUp 1s ease forwards 0.8s;
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
  opacity: 0;
  animation: fadeUp 1s ease forwards 1.2s;
  position: relative;
  overflow: hidden;
}

.start-btn:hover {
  background: var(--red);
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(138, 35, 35, 0.3);
}

/* --- MANUAL MODE (Scroll) --- */
.timeline-container {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 60px; 
  padding: 100px 20px;
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
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.timeline-row.visible {
  opacity: 1;
  transform: translateY(0);
}

/* --- GUIDED MODE (Animations) --- */
.guided-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0; left: 0;
  background: radial-gradient(circle at center, #f0ebe0 0%, #dcd0bc 100%);
  z-index: 500;
  overflow: hidden;
}

/* Dramatic Card Container */
.guided-card-container {
  width: 90%;
  max-width: 700px;
  perspective: 1500px;
  position: relative;
}

.guided-card {
  background: white;
  padding: 60px 50px;
  border-radius: 4px;
  box-shadow: 
    0 20px 50px rgba(0,0,0,0.2), 
    0 0 0 1px rgba(197, 160, 89, 0.3) inset;
  text-align: center;
  position: relative;
  background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
  
  /* ANIMATION TRIGGER */
  animation: cardFlipIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  transform-style: preserve-3d;
  overflow: hidden; /* For the autoplay bar */
}

/* Wax Seal decoration */
.guided-card::after {
  content: 'JR';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #8a2323;
  border-radius: 50%;
  color: rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel Decorative', serif;
  font-size: 1.2rem;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.2);
  border: 3px double rgba(0,0,0,0.2);
}

/* The Animated decorative border */
.guided-card::before {
  content: ''; position: absolute;
  top: 10px; left: 10px; right: 10px; bottom: 10px;
  border: 2px solid var(--gold);
  pointer-events: none;
  opacity: 0.5;
}

/* Directional Animations */
@keyframes cardFlipIn {
  0% { 
    opacity: 0; 
    transform: rotateY(-30deg) translateX(100px) scale(0.8); 
    filter: blur(10px);
  }
  100% { 
    opacity: 1; 
    transform: rotateY(0) translateX(0) scale(1); 
    filter: blur(0);
  }
}

@keyframes cardFlipInRev {
  0% { 
    opacity: 0; 
    transform: rotateY(30deg) translateX(-100px) scale(0.8); 
    filter: blur(10px);
  }
  100% { 
    opacity: 1; 
    transform: rotateY(0) translateX(0) scale(1); 
    filter: blur(0);
  }
}

.guided-card.anim-next { animation: cardFlipIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.guided-card.anim-prev { animation: cardFlipInRev 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 2px solid var(--gold);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  color: var(--ink);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.nav-arrow:hover { 
  background: var(--gold); 
  color: white; 
  transform: translateY(-50%) scale(1.15); 
  box-shadow: 0 0 20px rgba(197, 160, 89, 0.6);
}

.nav-arrow.prev { left: 5vw; }
.nav-arrow.next { right: 5vw; }
.nav-arrow:disabled { opacity: 0.1; cursor: default; pointer-events: none;}

/* Bottom Progress Bar (Total Progress) */
.progress-bar-container {
  position: absolute;
  bottom: 0; left: 0; width: 100%; height: 6px;
  background: rgba(0,0,0,0.05);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--red));
  transition: width 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* TOP AUTOPLAY TIMER BAR */
.autoplay-bar {
  position: absolute;
  top: 0; left: 0;
  height: 4px;
  background: var(--gold);
  width: 0%;
  z-index: 100;
  box-shadow: 0 0 10px var(--gold);
}

@keyframes fillTime {
  from { width: 0%; }
  to { width: 100%; }
}

.autoplay-active .autoplay-bar {
  animation: fillTime 12s linear forwards; 
}

/* --- Shared Card Styles --- */
.card {
  background: var(--card-bg);
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(197, 160, 89, 0.2);
  backdrop-filter: blur(5px);
}

.card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); border-color: var(--red); }

.card-main { grid-column: 1 / -1; justify-self: center; width: 100%; max-width: 600px; text-align: center; border-top: 5px solid var(--gold); }
.detour-left .card { grid-column: 1; justify-self: end; transform: rotate(-1deg); }
.detour-right .card { grid-column: 3; justify-self: start; transform: rotate(1deg); }

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

.step-number {
  font-family: 'Cinzel Decorative', serif;
  color: var(--gold);
  font-size: 3.5rem;
  opacity: 0.2;
  position: absolute;
  top: 10px; left: 20px;
  z-index: 0;
}

h3 {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin: 20px 0 10px 0;
  color: var(--ink);
  position: relative;
  z-index: 1;
}

.desc {
  font-family: 'Lato', sans-serif;
  font-style: italic;
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
}

.separator {
  color: var(--gold);
  margin: 15px 0;
  font-size: 1.5rem;
}

.significance {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--ink);
  border-top: 1px solid rgba(0,0,0,0.08);
  padding-top: 25px;
  margin-top: 10px;
}

/* --- Animations --- */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- Particles --- */
.particle {
  position: fixed;
  background: rgba(197, 160, 89, 0.4);
  border-radius: 50%;
  pointer-events: none;
  animation: float 20s infinite linear;
  z-index: 0;
  box-shadow: 0 0 10px rgba(197, 160, 89, 0.2);
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .hero-title { font-size: 3rem; }
  .timeline-row { display: flex; flex-direction: column; padding-bottom: 40px; }
  .spine-background { left: 20px; }
  .card-main, .detour-left .card, .detour-right .card { margin-left: 50px; width: calc(100% - 70px); transform: none; text-align: left; }
  
  .nav-arrow { top: auto; bottom: 20px; width: 45px; height: 45px; font-size: 1.2rem; }
  .nav-arrow.prev { left: 20px; }
  .nav-arrow.next { right: 20px; }
  
  .guided-card { padding: 40px 25px; margin-top: -60px; width: 100%; max-height: 65vh; overflow-y: auto; }
  .guided-card::after { width: 30px; height: 30px; font-size: 0.8rem; top: 10px; right: 10px;}
  .step-number { font-size: 2.5rem; }
  h3 { font-size: 1.8rem; }
}
`;

function App() {
  const [viewMode, setViewMode] = useState('hero'); // 'hero', 'manual', 'guided'
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // For animation direction

  // State for features
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false); // NEW: Autoplay state

  // Refs
  const observerRef = useRef(null);
  const audioRef = useRef(null);

  // --- AUDIO LOGIC ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      if (isMusicPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Waiting for interaction to play audio");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicPlaying]);

  const handleStart = (mode) => {
    setViewMode(mode);
    if (isMusicPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }
    // If starting guided, maybe default autoplay is off to let them get bearings,
    // or on if you prefer. Defaulting to OFF here to let user choose.
  };

  // --- TTS LOGIC ---
  useEffect(() => {
    window.speechSynthesis.cancel();

    if (isTTSEnabled && viewMode === 'guided') {
      const item = timelineData[guidedIndex];
      const textToSpeak = `${item.title}. ${item.shortDesc}. ${item.significance}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => voice.name.includes('Google US English') || voice.lang === 'en-US');
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }
  }, [guidedIndex, isTTSEnabled, viewMode]);

  // --- AUTOPLAY LOGIC (NEW) ---
  useEffect(() => {
    let interval;
    // Only run if Autoplay is ON, we are in guided mode, and not at the last slide
    if (isAutoPlay && viewMode === 'guided' && guidedIndex < timelineData.length - 1) {
      interval = setInterval(() => {
         nextStep();
      }, 12000); // 12 Seconds per slide (Matches CSS Animation duration)
    }

    // Cleanup: This runs when component unmounts OR when dependencies change.
    // Crucially, when guidedIndex changes (manual or auto), this clears the old timer
    // and starts a fresh one, effectively "resetting" the timer on manual interaction.
    return () => clearInterval(interval);
  }, [isAutoPlay, guidedIndex, viewMode]);


  // --- SCROLL ANIMATION LOGIC ---
  useEffect(() => {
    if (viewMode === 'manual') {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.15 });

      const rows = document.querySelectorAll('.timeline-row');
      rows.forEach(row => observerRef.current.observe(row));

      return () => {
        if (observerRef.current) observerRef.current.disconnect();
      };
    }
  }, [viewMode]);

  // Guided Mode Navigation
  const nextStep = () => {
    if (guidedIndex < timelineData.length - 1) {
      setDirection('next');
      setGuidedIndex(prev => prev + 1);
    } else {
        // Stop autoplay if we hit the end
        setIsAutoPlay(false);
    }
  };

  const prevStep = () => {
    if (guidedIndex > 0) {
      setDirection('prev');
      setGuidedIndex(prev => prev - 1);
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 25 }).map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 15 + 20}s`
      }}
    />
  ));

  return (
    <>
      <style>{styles}</style>
      <audio ref={audioRef} src={bgMusicFile} loop />
      {particles}

      <div className="app-main-wrapper">

        {/* --- HERO / LANDING --- */}
        {viewMode === 'hero' && (
          <div className="hero-wrapper">
            <h1 className="hero-title">Rizal Archives</h1>
            <p className="hero-subtitle">An Interactive Journey through Ideology & Sacrifice</p>
            <div style={{display: 'flex', gap: '20px'}}>
              <button className="start-btn" onClick={() => handleStart('guided')}>Start Guided Tour</button>
              <button className="start-btn" onClick={() => handleStart('manual')} style={{borderColor: '#2b2b2b', color: '#2b2b2b'}}>Explore Freely</button>
            </div>
          </div>
        )}

        {/* --- FLOATING CONTROL PANEL --- */}
        {viewMode !== 'hero' && (
          <div className="control-panel">
            <button
              className={`mode-btn ${viewMode === 'guided' ? 'active' : ''}`}
              onClick={() => { setViewMode('guided'); setIsAutoPlay(false); }}
            >
              Guided
            </button>
            <button
              className={`mode-btn ${viewMode === 'manual' ? 'active' : ''}`}
              onClick={() => { setViewMode('manual'); setIsAutoPlay(false); }}
            >
              Free Roam
            </button>

            <div style={{width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)', margin: '0 10px'}}></div>

            {/* AUTOPLAY BUTTON (Only in Guided Mode) */}
            {viewMode === 'guided' && (
                 <button
                 className={`icon-btn ${isAutoPlay ? 'active' : ''}`}
                 onClick={() => setIsAutoPlay(!isAutoPlay)}
                 title={isAutoPlay ? "Pause Autoplay" : "Start Autoplay"}
               >
                 {isAutoPlay ? (
                   // Pause Icon
                   <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                 ) : (
                   // Play Icon
                   <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 )}
               </button>
            )}

            <button
              className={`icon-btn ${isMusicPlaying ? 'active' : ''}`}
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              title={isMusicPlaying ? "Mute Music" : "Play Music"}
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
                title="Toggle Narrator"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21 1.01.33 2.05.33 3.1 0 3.95-3.23 7.16-7.16 7.16h-.84z"/>
                </svg>
              </button>
            )}
          </div>
        )}

        {/* --- GUIDED TOUR VIEW --- */}
        {viewMode === 'guided' && (
          <div className="guided-wrapper">
            <button className="nav-arrow prev" onClick={prevStep} disabled={guidedIndex === 0}>
               <svg style={{width:'24px', fill:'currentColor'}} viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>

            <div className="guided-card-container">
              {/* Key = guidedIndex ensures the component remounts, restarting animations */}
              <div
                className={`guided-card ${direction === 'next' ? 'anim-next' : 'anim-prev'} ${isAutoPlay ? 'autoplay-active' : ''}`}
                key={guidedIndex}
              >
                {/* NEW: Autoplay Timer Bar (Only visible when Autoplay is ON) */}
                {isAutoPlay && <div className="autoplay-bar"></div>}

                <div className="progress-bar-container">
                  <div className="progress-bar" style={{width: `${((guidedIndex + 1) / timelineData.length) * 100}%`}}></div>
                </div>

                <span className="step-number">{timelineData[guidedIndex].id}</span>

                {timelineData[guidedIndex].type === 'detour' && (
                  <span className="detour-badge">{timelineData[guidedIndex].category}</span>
                )}

                <h3>{timelineData[guidedIndex].title}</h3>
                <p className="desc">{timelineData[guidedIndex].shortDesc}</p>
                <div className="separator">~ ❦ ~</div>
                <p className="significance">{timelineData[guidedIndex].significance}</p>

                <div className="meta" style={{marginTop: '30px', color: '#999', fontSize: '0.75rem', fontFamily: 'Lato'}}>
                  {timelineData[guidedIndex].year} | {timelineData[guidedIndex].source}
                </div>
              </div>
            </div>

            <button className="nav-arrow next" onClick={nextStep} disabled={guidedIndex === timelineData.length - 1}>
              <svg style={{width:'24px', fill:'currentColor'}} viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
          </div>
        )}

        {/* --- MANUAL FREE ROAM VIEW --- */}
        {viewMode === 'manual' && (
          <div className="timeline-container">
            <div className="spine-background"></div>

            <div className="hero-text" style={{textAlign: 'center', marginBottom: '50px'}}>
              <h1>The Timeline</h1>
              <p style={{fontFamily:'Lato', color:'#666'}}>Scroll to explore the path.</p>
            </div>

            {timelineData.map((item, index) => {
              const isDetour = item.type === 'detour';
              return (
                <div
                  key={item.id}
                  className={`timeline-row ${isDetour ? `detour-${item.alignment}` : 'main-event'}`}
                >
                  <div className={`card ${isDetour ? 'card-detour' : 'card-main'}`}>
                    {isDetour && <span className="detour-badge">{item.category}</span>}
                    <h3>{item.title}</h3>
                    <p className="desc">{item.shortDesc}</p>
                    <p className="significance" style={{fontSize: '0.9rem'}}>{item.significance}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
}

export default App;