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
    const displayImageSrc = isHovered ? '/sakura-coming-soon.jpg' : src;
    return (
      <div 
        className="relative w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={displayImageSrc}
          alt={alt}
          width={500}
          height={500}
          className="w-full h-full object-cover transition-all duration-300"
        />
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
