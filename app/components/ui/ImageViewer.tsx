'use client';

import React from 'react';
import Image from 'next/image';

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div className="relative max-w-3xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-white text-3xl font-bold p-2"
          onClick={onClose}
        >
          &times;
        </button>
        <Image src={src} alt={alt} layout="intrinsic" width={800} height={600} objectFit="contain" />
      </div>
    </div>
  );
};

export default ImageViewer;
