'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { ProductCard } from '@/app/components/products/ProductCard';
import { Product } from '@/app/data/products';

interface ProductPageContentProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductPageContent({ product, relatedProducts }: ProductPageContentProps) {
  // Check if this is the Sakura deck (ID: 3)
  if (product.id === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="max-w-4xl w-full">
          <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">COMING SOON</h1>
              <p className="text-xl text-gray-300 mb-8">The Sakura Deck Collection will be available soon</p>
              <div className="w-full max-w-md mx-auto">
                <div className="aspect-video bg-gray-800 rounded-lg mb-6 overflow-hidden">
                  <Image
                    src="/sakura.jpg"
                    alt="Sakura Deck Preview"
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button 
                  asChild 
                  className="w-full bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  <Link href="/shop">
                    BACK TO SHOP
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* Thumbnails would go here */}
            <div className="aspect-square bg-gray-200 rounded-md" />
            <div className="aspect-square bg-gray-200 rounded-md" />
            <div className="aspect-square bg-gray-200 rounded-md" />
            <div className="aspect-square bg-gray-200 rounded-md" />
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
              <Button className="w-full py-6 text-base font-medium" disabled={!product.inStock}>
                {product.inStock ? 'Available' : 'Out of Stock'}
              </Button>
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
