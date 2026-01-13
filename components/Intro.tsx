import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation (fade out) after 2 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Unmount component after animation completes (2s + 500ms transition)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface transition-opacity duration-500 ease-in-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-in zoom-in-90 duration-700 fade-in">
        <Logo size="xl" className="shadow-primary/20 shadow-xl" />
        <div className="overflow-hidden">
          <h1 className="text-3xl font-bold text-[#1D1B20] tracking-tight animate-in slide-in-from-bottom-full duration-700 delay-200 fill-mode-both">
            TaskFlow
          </h1>
        </div>
      </div>
    </div>
  );
};