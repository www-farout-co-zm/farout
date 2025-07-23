'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LogoAnimation() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const totalFrames = 9; // Now we have 9 logo variations
  const frameDuration = 1000; // 1 second per frame for smooth animation

  // Array of logo image paths - updated to include all 9 variations
  const logoFrames = [
    '/logo-color-1.jpg',
    '/logo-color-2.jpg',
    '/logo-color-3.jpg',
    '/logo-color-4.jpg',
    '/logo-color-5.jpg',
    '/logo-color-6.jpg',
    '/logo-color-7.jpg',
    '/logo-color-8.jpg',
    '/logo-color-9.jpg',
  ];

  // Log when component mounts and unmounts
  useEffect(() => {
    console.log('LogoAnimation mounted');
    setIsMounted(true);
    return () => {
      console.log('LogoAnimation unmounted');
      setIsMounted(false);
    };
  }, []);

  // Animation effect
  useEffect(() => {
    console.log('Starting animation');
    
    // Set up the animation interval
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = (prevFrame + 1) % totalFrames;
        console.log(`Changing to frame ${nextFrame + 1} of ${totalFrames}`);
        return nextFrame;
      });
    }, frameDuration);

    // Clean up the interval on component unmount
    return () => {
      console.log('Clearing animation interval');
      clearInterval(interval);
    };
  }, [totalFrames, frameDuration]);

  // Log when frames change
  useEffect(() => {
    console.log(`Current frame: ${currentFrame + 1}/${totalFrames}`, logoFrames[currentFrame]);
  }, [currentFrame]);

  if (!isMounted) {
    return <div className="w-full h-full flex items-center justify-center">
      <div className="text-white">Loading logo...</div>
    </div>;
  }

  return (
    <div className="relative w-full h-full border-2 border-red-500">
      {logoFrames.map((src, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentFrame ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: index % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'transparent',
          }}
        >
          <Image
            src={src}
            alt={`FAR OUT Logo ${index + 1}`}
            fill
            className="object-contain"
            priority
            onLoadingComplete={() => console.log(`Loaded frame ${index + 1}: ${src}`)}
            onError={(e) => console.error(`Error loading image ${src}:`, e)}
          />
        </div>
      ))}
      {/* Debug overlay - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs p-1 rounded">
          Frame: {currentFrame + 1}/{totalFrames}
        </div>
      )}
    </div>
  );
}
