'use client';

import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  status?: string;
}

export default function ImageViewer({
  src,
  alt,
  isOpen,
  onClose,
  title,
  status,
}: ImageViewerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? alt}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl rounded-lg bg-white p-4 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black p-2 text-white hover:bg-zinc-800"
          aria-label="Close image viewer"
        >
          <X className="h-5 w-5" />
        </button>

        {(title || status) && (
          <div className="mb-4 pr-12">
            {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
            {status && <p className="text-sm text-gray-500">{status}</p>}
          </div>
        )}

        <div className="relative h-[70vh] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
