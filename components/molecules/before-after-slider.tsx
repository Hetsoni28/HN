'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'Old Design', 
  afterLabel = 'New Design' 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onPointerUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl select-none group cursor-ew-resize touch-none shadow-2xl ring-1 ring-slate-900/10"
      onPointerDown={(e) => {
         setIsDragging(true);
         handleMove(e.clientX);
      }}
    >
      {/* After Image (Background) */}
      <div className="relative w-full aspect-[16/9]">
        <Image src={afterImage} alt={afterLabel} fill className="object-cover"  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute right-4 top-4 rounded bg-black/60 px-3 py-1.5 text-xs font-bold tracking-widest uppercase text-white backdrop-blur-md">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 aspect-[16/9]"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={beforeImage} alt={beforeLabel} fill className="object-cover"  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute left-4 top-4 rounded bg-black/60 px-3 py-1.5 text-xs font-bold tracking-widest uppercase text-white backdrop-blur-md">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl text-[#0051FF] ring-1 ring-slate-900/5 transition-transform group-hover:scale-110">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3m0 0l3 3m-3-3h14m0 0l-3-3m3 3l-3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
