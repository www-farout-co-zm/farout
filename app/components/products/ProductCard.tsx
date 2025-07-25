'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ProductImageHover } from './ProductImageHover';
import { Product } from '@/app/data/products';
import ImageViewer from '@/components/ui/ImageViewer';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (product.id === 3) { 
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
            <div className="aspect-square overflow-hidden bg-gray-100">
              {product.imageUrl ? (
                <ProductImageHover
                  src={product.imageUrl}
                  alt={product.name}
                  isSakura={product.id === 3}
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
            <div className="aspect-square overflow-hidden bg-gray-100">
              {product.imageUrl ? (
                <ProductImageHover
                  src={product.imageUrl}
                  alt={product.name}
                  isSakura={product.id === 3}
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
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
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

      {product.id === 3 && isViewerOpen && (
        <ImageViewer
          src="/sakura.jpg"
          alt={`${product.name} - Full View`}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
}
