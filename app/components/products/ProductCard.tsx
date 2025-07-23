'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon } from '@/app/components/ui/ShoppingCartIcon';
import { ProductImageHover } from './ProductImageHover';

// Simple placeholder image component
const PlaceholderImage = ({ text = 'No Image' }: { text?: string }) => (
  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
    <span className="text-gray-400 text-sm">{text}</span>
  </div>
);

interface ProductCardProps {
  // Either pass a product object or individual props
  product?: Product;
  variant?: 'default' | 'compact';
  
  // Individual props as fallback
  id?: number;
  name?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  isNew?: boolean;
  description?: string;
  brand?: string;
  inStock?: boolean;
  sizes?: string[];
  colors?: string[];
}

const ProductCard = ({
  product,
  variant = 'default',
  // Individual props with defaults
  id,
  name = '',
  price = 0,
  imageUrl,
  category = '',
  isNew = false,
  description = '',
  brand = '',
  inStock = true,
  sizes = [],
  colors = []
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart, isInCart } = useCart();
  
  // Create a safe product object with defaults
  const safeProduct: Product = {
    id: product?.id ?? id ?? 0,
    name: product?.name ?? name ?? 'Unnamed Product',
    price: product?.price ?? price ?? 0,
    imageUrl: product?.imageUrl ?? imageUrl,
    category: product?.category ?? category ?? '',
    isNew: product?.isNew ?? isNew ?? false,
    description: product?.description ?? description,
    brand: product?.brand ?? brand,
    inStock: product?.inStock ?? inStock ?? true,
    sizes: product?.sizes ?? sizes ?? [],
    colors: product?.colors ?? colors ?? []
  };
  
  // Use safeProduct properties directly to avoid destructuring issues
  const productImage = safeProduct.imageUrl || '';
  const productName = safeProduct.name;
  const productPrice = safeProduct.price;
  const productId = safeProduct.id;
  const productInStock = safeProduct.inStock ?? true;
  const productCategory = safeProduct.category;
  const productIsNew = safeProduct.isNew ?? false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(safeProduct);
    // Reset the loading state after a short delay for better UX
    setTimeout(() => setIsAdding(false), 500);
  };

  if (variant === 'compact') {
    return (
      <Link 
        href={routes.product(productId.toString())} 
        className="group flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {productImage ? (
            <img
              src={productImage}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <PlaceholderImage text="Product" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 group-hover:text-black">
            {productName}
          </h3>

          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 text-xs h-7"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(safeProduct);
            }}
            disabled={isInCart(productId)}
          >
            {isInCart(productId) ? 'In Cart' : 'Add'}
          </Button>
        </div>
      </Link>
    );
  }

  // Check if this is the Sakura deck (ID: 3)
  const isSakuraDeck = productId === 3;

  return (
    <div className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg ${className || ''}`}>
      <div className="relative">
        <Link href={`/products/${productId}`} className="block">
          <div className="aspect-square overflow-hidden bg-gray-100">
            {productImage ? (
              <ProductImageHover 
                src={productImage}
                alt={productName}
                isSakura={productId === 3} // Special handling for Sakura deck (ID: 3)
              />
            ) : (
              <PlaceholderImage text={productName} />
              {isSakuraDeck && (
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Image
                    src="/sakura-coming-soon.jpg" // Make sure to add this image to your public folder
                    alt={`${productName} - Coming Soon`}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </>
          ) : (
            <PlaceholderImage text={productName} />
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {productCategory}
            </span>
            {productIsNew && (
              <span className="rounded-full bg-black px-2 py-1 text-xs font-medium text-white">
                New
              </span>
            )}
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 line-clamp-2">
            {productName}
          </h3>

        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <div className="space-y-2">
          <Button className="w-full" asChild>
            <Link href={routes.product(id.toString())}>
              View Details
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleAddToCart}
            disabled={isAdding || isInCart(id)}
          >
            {isAdding ? (
              'Adding...'
            ) : isInCart(id) ? (
              <>
                <ShoppingCartIcon className="w-4 h-4" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCartIcon className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
