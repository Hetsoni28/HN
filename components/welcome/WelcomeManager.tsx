'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { WelcomeScreen } from './WelcomeScreen';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  try {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasPlayed = sessionStorage.getItem('hn-welcome-played');
    return !hasPlayed && !prefersReducedMotion;
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function WelcomeManager() {
  const shouldPlay = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const showWelcome = shouldPlay && !dismissed;

  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [showWelcome]);

  const handleComplete = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('hn-welcome-played', 'true');
    } catch {
      // Storage access blocked or restricted
    }
  };

  if (!showWelcome) return null;

  return <WelcomeScreen isVisible={showWelcome} onComplete={handleComplete} />;
}
