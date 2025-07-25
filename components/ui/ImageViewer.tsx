'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageViewer({ src, alt, isOpen, onClose }: ImageViewerProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Re-enable scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose} // Close on overlay click
    >
      <div className="relative max-w-3xl max-h-full mx-auto p-4" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking on image container */}
        <button
          className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          &times;
        </button>
        <Image
          src={src}
          alt={alt}
          width={1000} // Adjust as needed for full view
          height={1000} // Adjust as needed for full view
          className="object-contain w-full h-full"
          priority
        />
      </div>
    </div>
  );
}
