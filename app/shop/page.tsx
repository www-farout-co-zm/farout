'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, getProductsByCategory } from '../data/products';

const categories = [
  { name: 'ALL', slug: 'all' },
  { name: 'DECKS', slug: 'decks' },
  { name: 'TRUCKS', slug: 'trucks' },
  { name: 'WHEELS', slug: 'wheels' },
  { name: 'HARDWARE', slug: 'hardware' },
  { name: 'APPAREL', slug: 'apparel' },
  { name: 'ACCESSORIES', slug: 'accessories' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter products by category
  const filteredProducts = useMemo(() => {
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Filter */}
      <div className="bg-black text-white py-4 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategory(category.slug)}
                className={`uppercase text-sm font-medium py-1 px-2 border-b-2 transition-colors ${
                  selectedCategory === category.slug 
                    ? 'border-white' 
                    : 'border-transparent hover:border-white/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* Product Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'ITEM' : 'ITEMS'}
          </p>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-600">SORT</span>
            <select 
              className="bg-transparent border-0 text-sm focus:ring-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/products/${product.id}`} className="block">
                {/* Image Container with Hover Effect */}
                <div className="relative aspect-square bg-white mb-3 overflow-hidden group">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          console.error('Error loading product image:', product.imageUrl);
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/logo.png';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  {/* Hover overlay with quick view */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      className="bg-white text-black px-4 py-2 text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Quick view:', product.id);
                      }}
                    >
                      Quick View
                    </button>
                  </div>
                  {/* Quick View Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <button 
                      className="bg-white text-black px-4 py-2 text-xs font-medium tracking-wider uppercase"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add quick view functionality here
                        console.log('Quick view:', product.id);
                      }}
                    >
                      Quick View
                    </button>
                  </div>
                  {/* New Badge */}
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
                      NEW
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="text-left p-1">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">
                    {product.brand || 'FAR OUT'}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {product.name}
                  </p>
                  {product.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  {/* Product Meta */}
                  <div className="mt-2 flex items-center justify-between">
                    {product.category && (
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                    )}
                    {/* Add to Cart Button - Hidden until hover */}
                    <button 
                      className="opacity-0 group-hover:opacity-100 text-xs font-medium text-gray-900 hover:text-black transition-opacity duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Add to cart functionality
                        console.log('Add to cart:', product.id);
                      }}
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button with Animation */}
        <div className="text-center mt-16 mb-20">
          <button 
            className="relative inline-flex items-center px-8 py-3 overflow-hidden text-sm font-medium text-black border-2 border-black group hover:text-white"
            onClick={() => {
              // Load more functionality
              console.log('Load more products');
            }}
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-4 ease">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="relative">LOAD MORE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
