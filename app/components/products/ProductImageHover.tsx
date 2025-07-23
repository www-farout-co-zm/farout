'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageHoverProps {
  src: string;
  alt: string;
  isSakura: boolean;
}

export function ProductImageHover({ src, alt, isSakura }: ProductImageHoverProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
    );
  }

  if (isSakura) {
    return (
      <div 
        className="relative w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={src}
            alt={alt}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Image
            src="/sakura-coming-soon.jpg"
            alt={`${alt} - Coming Soon`}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
      />
    </div>
  );
}
