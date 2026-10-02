'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TOTAL_TIME = 38;

const voiceSegments = [
  { t: 0, text: "Every great product starts with a problem." },
  { t: 4, text: "Cluttered dashboards." },
  { t: 5.5, text: "Confusing user experiences." },
  { t: 7.5, text: "And code that doesn't scale." },
  { t: 10, text: "At H N, we fix that." },
  { t: 12, text: "We write clean, scalable code that brings your vision to life." },
  { t: 16.5, text: "We transform messy ideas into world-class web applications." },
  { t: 22, text: "And stunning mobile experiences that your users will actually love." },
  { t: 27, text: "How do we deliver? Fast." },
  { t: 29.5, text: "With two-week sprints." },
  { t: 31, text: "Daily updates." },
  { t: 32.5, text: "And zero disappearing acts." },
  { t: 34.5, text: "Stop waiting. Start building." },
  { t: 36.5, text: "H N." }
];

export function ShowreelPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1000);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);
  const nextVoiceIndex = useRef(0);
  const synthVoice = useRef<SpeechSynthesisVoice | null>(null);

  // States for scenes to trigger CSS classes
  const [s1, setS1] = useState(0); // 0: hidden, 1: text1, 2: text2
  const [s2, setS2] = useState(0);
  const [s3, setS3] = useState(0);
  const [s4, setS4] = useState(0);
  const [s5, setS5] = useState(0);
  const [s6, setS6] = useState(0);
  const [s7, setS7] = useState(0);

  const [media, setMedia] = useState({
    before: false,
    dev: false,
    mobile: false,
    overlay: false,
    wipeScene: false,
    wipeProgress: 0 // 0 to 100
  });

  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      synthVoice.current = voices.find(v => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural'))) || voices[0] || null;
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const reset = () => {
    setProgress(0);
    setS1(0); setS2(0); setS3(0); setS4(0); setS5(0); setS6(0); setS7(0);
    setMedia({ before: false, dev: false, mobile: false, overlay: false, wipeScene: false, wipeProgress: 0 });
    window.speechSynthesis.cancel();
    nextVoiceIndex.current = 0;
  };

  const play = () => {
    if (isPlaying) return;
    if (window.speechSynthesis.getVoices().length === 0) window.speechSynthesis.getVoices();
    
    setIsPlaying(true);
    startTimeRef.current = null;
    reset();
    reqRef.current = requestAnimationFrame(loop);
  };

  const loop = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = (time - startTimeRef.current) / 1000;

    if (elapsed > TOTAL_TIME) {
      setIsPlaying(false);
      return;
    }

    setProgress((elapsed / TOTAL_TIME) * 100);

    // Audio
    if (nextVoiceIndex.current < voiceSegments.length && elapsed >= voiceSegments[nextVoiceIndex.current].t) {
      const seg = voiceSegments[nextVoiceIndex.current];
      const utterance = new SpeechSynthesisUtterance(seg.text);
      if (synthVoice.current) utterance.voice = synthVoice.current;
      utterance.rate = 1.05;
      utterance.pitch = 0.9;
      window.speechSynthesis.speak(utterance);
      nextVoiceIndex.current++;
    }

    // Visual Timeline
    // Scene 1
    if (elapsed > 0 && elapsed < 4) {
      if (elapsed > 0.5) setS1(1);
      if (elapsed > 1.5) setS1(2);
    } else setS1(0);

    // Scene 2
    if (elapsed > 4 && elapsed < 10) {
      if (elapsed > 4.5) setS2(1);
      if (elapsed > 6.0) setS2(2);
    } else setS2(0);

    // Scene 3
    if (elapsed > 10 && elapsed < 15.5) {
      if (elapsed > 10.5) setS3(1);
      if (elapsed > 11.5) setS3(2);
    } else setS3(0);

    // Scene 4
    if (elapsed > 15.5 && elapsed < 21.5) {
      if (elapsed > 16) setS4(1);
      if (elapsed > 18) setS4(2);
    } else setS4(0);

    // Scene 5
    if (elapsed > 21.5 && elapsed < 27) {
      if (elapsed > 22) setS5(1);
      if (elapsed > 23.5) setS5(2);
    } else setS5(0);

    // Scene 6
    if (elapsed > 27 && elapsed < 33.5) {
      if (elapsed > 27.5) setS6(1);
    } else setS6(0);

    // Scene 7
    if (elapsed > 33.5) {
      if (elapsed > 34) setS7(1);
      if (elapsed > 35.5) setS7(2);
    } else setS7(0);

    // Media Logic
    setMedia(prev => {
      const next = { ...prev };
      
      // Before Dashboard
      next.before = (elapsed > 4 && elapsed < 10);
      
      // Dev
      next.dev = (elapsed > 10 && elapsed < 15.5);
      
      // Wipe
      next.wipeScene = (elapsed > 15.5 && elapsed < 21.5);
      if (elapsed > 16.5 && elapsed < 21.5) {
        next.wipeProgress = Math.min(100, (elapsed - 16.5) * 50); // Takes 2 seconds to reach 100%
      } else {
        next.wipeProgress = 0;
      }

      // Mobile
      next.mobile = (elapsed > 21.5 && elapsed < 27);
      
      // Overlay
      next.overlay = ((elapsed > 4 && elapsed < 15.5) || (elapsed > 21.5 && elapsed < 27));

      return next;
    });

    reqRef.current = requestAnimationFrame(loop);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      
      {/* Player Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Our Vision & Work</h2>
          <p className="text-slate-500">Make sure your volume is turned up to hear the AI voiceover.</p>
        </div>
        <button 
          onClick={play}
          disabled={isPlaying}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
        >
          {isPlaying ? 'Playing...' : '▶ Play Cinematic Video'}
        </button>
      </div>

      {/* 16:9 Player Window */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
      >
        
        {/* Initial Poster State */}
        <button 
          onClick={play}
          className={`absolute inset-0 w-full h-full z-20 flex flex-col items-center justify-center bg-slate-50 transition-all duration-1000 group ${!isPlaying && progress === 0 ? 'opacity-100 cursor-pointer hover:bg-slate-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="flex flex-col items-center gap-4 md:gap-10 transform transition-transform duration-700 group-hover:scale-105 p-4">
            <Image src="/hn-logo.svg" alt="HN Logo" width={280} height={90} className="w-32 md:w-[280px] h-auto opacity-90" />
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[#0051FF] font-bold tracking-widest uppercase text-xs md:text-sm">
              <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#0051FF] text-white shadow-xl shadow-blue-500/30 transition-transform group-hover:scale-110">
                <svg className="w-4 h-4 md:w-6 md:h-6 translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <span className="hidden md:inline">Watch Showreel</span>
            </div>
          </div>
        </button>

        {/* Media Layers */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${media.before ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <Image src="/images/showreel/before.jpg" alt="Before" fill className="object-cover" priority />
        </div>

        <div className={`absolute inset-0 transition-opacity duration-500 ${media.wipeScene ? 'opacity-100' : 'opacity-0'}`}>
          <Image src="/images/showreel/before.jpg" alt="Before" fill className="object-cover" />
          <div 
            className="absolute inset-0 overflow-hidden border-r-4 border-cyan-400 shadow-[20px_0_40px_rgba(34,211,238,0.5)] transition-all duration-100 ease-linear"
            style={{ width: `${media.wipeProgress}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerWidth }}>
              <Image src="/images/showreel/after.jpg" alt="After" fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 transition-opacity duration-1000 ${media.dev ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <Image src="/images/showreel/dev.jpg" alt="Developer" fill className="object-cover" />
        </div>

        <div className={`absolute inset-0 transition-opacity duration-1000 ${media.mobile ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
          <Image src="/images/showreel/mobile.jpg" alt="Mobile" fill className="object-cover" />
        </div>

        {/* Overlay */}
        <div className={`absolute inset-0 bg-white/85 transition-opacity duration-1000 ${media.overlay ? 'opacity-100' : 'opacity-0'}`} />

        {/* Scenes */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s1 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-4xl md:text-6xl font-bold text-slate-900 transition-all duration-1000 ${s1 >= 1 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            Every great product
          </h2>
          <h3 className={`mt-2 text-2xl md:text-4xl text-slate-500 transition-all duration-1000 ${s1 >= 2 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            starts with a problem.
          </h3>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s2 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-4xl md:text-7xl font-bold bg-red-500 text-transparent bg-clip-text transition-all duration-1000 ${s2 >= 1 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            Cluttered interfaces.
          </h2>
          <h3 className={`mt-2 text-2xl md:text-4xl text-slate-900 transition-all duration-1000 ${s2 >= 2 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            Code that doesn&apos;t scale.
          </h3>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s3 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-4xl md:text-6xl font-bold text-slate-900 transition-all duration-1000 ${s3 >= 1 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            At <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">HN</span>,
          </h2>
          <h3 className={`mt-2 text-2xl md:text-4xl text-slate-900 transition-all duration-1000 ${s3 >= 2 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            we fix that.
          </h3>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s4 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-3xl md:text-6xl font-bold text-slate-900 drop-shadow-[0_4px_20px_rgba(255,255,255,0.9)] transition-all duration-1000 ${s4 >= 1 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            We transform messy ideas
          </h2>
          <h3 className={`text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 drop-shadow-[0_4px_20px_rgba(255,255,255,0.9)] transition-all duration-1000 ${s4 >= 2 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            into world-class software.
          </h3>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s5 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-4xl md:text-6xl font-bold text-slate-900 transition-all duration-1000 ${s5 >= 1 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            And stunning mobile apps
          </h2>
          <h3 className={`mt-2 text-2xl md:text-4xl text-slate-600 transition-all duration-1000 ${s5 >= 2 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            your users will actually love.
          </h3>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s6 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white/80 backdrop-blur-xl border border-blue-100 p-8 md:p-12 rounded-3xl shadow-[0_20px_60px_rgba(0,81,255,0.1)] transition-all duration-1000 ${s6 >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 mb-8">
              How we deliver.
            </h2>
            <div className="flex flex-col gap-5 text-left mx-auto w-fit text-slate-800 font-semibold text-xl md:text-2xl">
              <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">✓</div> 2-Week Sprints</div>
              <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">✓</div> Daily Updates</div>
              <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">✓</div> Zero disappearing acts</div>
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${s7 > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className={`text-3xl md:text-5xl font-medium text-slate-500 transition-all duration-1000 ${s7 >= 1 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            Stop waiting. Start building.
          </h2>
          <div className={`mt-8 transition-all duration-1000 ${s7 >= 2 ? 'translate-y-0 blur-0 opacity-100' : 'translate-y-4 blur-md opacity-0'}`}>
            <Image src="/hn-logo.svg" alt="HN Logo" width={300} height={100} />
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-1.5 bg-blue-600 z-50 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-8">
        <Link href="/contact" className="inline-block bg-[#0051FF] hover:bg-blue-700 !text-white font-semibold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-500/20">
          Start Your Project With HN →
        </Link>
      </div>
    </div>
  );
}
