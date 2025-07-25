'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageHoverProps {
  src: string;
  alt: string;
  isSakura: boolean;
  selectedColor?: string;
  productId?: number;
}

export const ProductImageHover: React.FC<ProductImageHoverProps> = ({
  src,
  alt,
  isSakura,
  selectedColor,
  productId,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className="object-contain object-top"
      />
    );
  }

  // Handle Sakura deck separately
  if (isSakura) {
    return (
      <div 
        className="relative w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? '/sakura-coming-soon.jpg' : src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          className="object-contain object-top transition-all duration-300"
        />
      </div>
    );
  }

  // Handle Stashman decks (product IDs 4, 5, 6) with color selection
  if (productId && [4, 5, 6].includes(productId)) {
    return (
      <div 
        className="w-full h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={currentSrc} // Use currentSrc for Stashman decks
          alt={alt}
          layout="fill"
          objectFit="contain"
          className={`object-contain object-top transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
        />
      </div>
    );
  }

  // Handle all other products
  return (
    <div 
      className="w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className={`object-contain object-top transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
      />
    </div>
  );
}
