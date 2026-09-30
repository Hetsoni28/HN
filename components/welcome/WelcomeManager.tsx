'use client';

import { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';

export function WelcomeManager() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if we've already played the animation this session
    const hasPlayed = sessionStorage.getItem('hn-welcome-played');

    if (!hasPlayed && !prefersReducedMotion) {
      setShowWelcome(true);
      // Fallback safeguard to ensure body scrolling is restored if something goes wrong
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('hn-welcome-played', 'true');
    document.body.style.overflow = '';
  };

  if (!isMounted) return null;

  return <WelcomeScreen isVisible={showWelcome} onComplete={handleComplete} />;
}
