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
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (productId && [4, 5, 6].includes(productId) && selectedColor) {
      setCurrentSrc(`/stashman-${selectedColor}.jpg`);
    } else {
      setCurrentSrc(src);
    }
  }, [selectedColor, productId, src]);

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
        className="w-full h-full object-contain"
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
        {isSakura && isHovered ? (
          <Image
            src="/sakura-coming-soon.jpg"
            alt="Sakura Coming Soon"
            layout="fill"
            objectFit="contain"
            className="transition-opacity duration-300"
          />
        ) : productId && [4, 5, 6].includes(productId) ? (
          <Image
            src={currentSrc}
            alt={alt}
            layout="fill"
            objectFit="contain"
            className="transition-opacity duration-300"
          />
        ) : (
          <Image
            src={displayImageSrc}
            alt={alt}
            layout="fill"
            objectFit="contain"
            className="w-full h-full object-contain transition-all duration-300"
          />
        )}
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
        layout="fill"
        objectFit="contain"
        className={`w-full h-full object-contain transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
      />
    </div>
  );
}
