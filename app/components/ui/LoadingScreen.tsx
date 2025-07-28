'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Add a delay to show the loading animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for the fade out animation to complete before removing from DOM
      setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 500);
    }, 3000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    // Add a small delay to allow the click animation to play
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div 
        className={`relative w-40 h-40 cursor-pointer transition-transform duration-300 ${isAnimating ? 'scale-110' : 'hover:scale-105'}`}
        onClick={handleClick}
      >
        <Image
          src="/farout-loading.jpg"
          alt="FAR OUT Loading Screen"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="mt-6 text-white text-lg font-medium animate-pulse">Click logo to enter site</p>
    </div>
  );
};

export default LoadingScreen;
