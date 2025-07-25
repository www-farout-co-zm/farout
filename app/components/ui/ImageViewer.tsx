'use client';

import React from 'react';
import Image from 'next/image';

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  status?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, isOpen, onClose, title, status }) => {
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
        {title && <h2 className="text-white text-4xl font-bold mb-4 text-center uppercase tracking-wider">{title}</h2>}
        <Image src={src} alt={alt} layout="intrinsic" width={800} height={600} objectFit="contain" />
        {status && <p className="text-red-500 text-3xl font-bold mt-4 text-center uppercase tracking-wider">{status}</p>}
      </div>
    </div>
  );
};

export default ImageViewer;
