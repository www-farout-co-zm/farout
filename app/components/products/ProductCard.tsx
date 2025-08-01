'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ProductImageHover } from './ProductImageHover';
import { Product } from '@/app/data/products';
import ImageViewer from '@/app/components/ui/ImageViewer';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

  const [isHovered, setIsHovered] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (product.colors && product.colors.length > 0 && [4, 5, 6].includes(product.id)) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);



  const handleContactWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = '+1234567890'; // Replace with your WhatsApp Business number
    const message = `Hi, I'm interested in the ${product.name} (Product ID: ${product.id}). Is it available?`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (product.id === 3 || product.id === 18) { 
      setIsViewerOpen(true);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {product.id === 3 ? (
          <div
            className="block cursor-pointer"
            aria-label={`View ${product.name}`}
            onClick={handleImageClick}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <ProductImageHover
                  src={product.imageUrls[0]}
                  alt={product.name}
                  isSakura={product.id === 3}
                  selectedColor={selectedColor}
                  productId={product.id}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link
            href={`/products/${product.id}`}
            className="block"
            aria-label={`View ${product.name}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <ProductImageHover
                  src={product.imageUrls[0]}
                  alt={product.name}
                  isSakura={product.id === 3}
                  selectedColor={selectedColor}
                  productId={product.id}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
              )}
            </div>
          </Link>
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors text-sm px-4 py-2"
            onClick={handleContactWhatsApp}
          >
            Contact via WhatsApp
          </button>
        </div>

        {product.isNew && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            New
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <Link href={`/products/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>


      </div>

      {isViewerOpen && (
        <ImageViewer
          src={product.id === 3 ? "/sakura.jpg" : product.id === 18 ? "/skate-tools.jpg" : ""} // Use specific image for Skate Tools
          alt={`${product.name} - Full View`}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          title={product.name} // Pass product name as title
          status={product.id === 18 ? "OUT OF STOCK" : product.id === 3 ? "COMING SOON" : ""} // Pass specific status for Skate Tools
        />
      )}
    </div>
  );
}
