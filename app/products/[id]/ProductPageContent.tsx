'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/app/components/products/ProductCard';
import { Product } from '@/app/data/products';

interface ProductPageContentProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageContent({ product, relatedProducts }: ProductPageContentProps) {
  const [selectedImage, setSelectedImage] = useState<string>(product.imageUrls?.[0] || '/placeholder-product.jpg');

  useEffect(() => {
    setSelectedImage(product.imageUrls?.[0] || '/placeholder-product.jpg');
  }, [product]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.imageUrls && product.imageUrls.length > 0 && (() => {
              const imageUrls = product.imageUrls;
              return (
                <div
                  className={cn(
                    "relative aspect-square bg-gray-200 rounded-md cursor-pointer overflow-hidden",
                    selectedImage === imageUrls[0] && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedImage(imageUrls[0])}
                >
                  <Image
                    src={imageUrls[0]}
                    alt={`${product.name} - Front`}
                    fill
                    className="object-contain"
                  />
                </div>
              );
            })()}
            {product.imageUrls && product.imageUrls.length > 1 && (() => {
              const imageUrls = product.imageUrls;
              return (
                <div
                  className={cn(
                    "relative aspect-square bg-gray-200 rounded-md cursor-pointer overflow-hidden",
                    selectedImage === imageUrls[1] && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedImage(imageUrls[1])}
                >
                  <Image
                    src={imageUrls[1]}
                    alt={`${product.name} - Back`}
                    fill
                    className="object-contain"
                  />
                </div>
              );
            })()}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{product.description || 'No description available.'}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Details</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>Brand: {product.brand || 'N/A'}</li>
                <li>Category: {product.category || 'N/A'}</li>
                <li>Status: {product.inStock ? 'In Stock' : 'Out of Stock'}</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              {product.inStock ? (
                <Button asChild className="w-full py-6 text-base font-medium">
                  <a 
                    href={`https://wa.me/1234567890?text=I'm interested in your ${product.name} product.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Inquire on WhatsApp
                  </a>
                </Button>
              ) : (
                <Button className="w-full py-6 text-base font-medium" disabled>
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
