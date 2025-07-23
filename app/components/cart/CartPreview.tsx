'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/app/components/ui/button';
import { ShoppingCartIcon } from '@/app/components/ui/ShoppingCartIcon';

export function CartPreview() {
  const { items, itemCount, cartTotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (itemCount === 0) {
    return (
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-700 hover:text-black transition-colors"
          aria-label="Shopping Cart (0 items)"
        >
          <ShoppingCartIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-black transition-colors"
        aria-label={`Shopping Cart (${itemCount} items)`}
      >
        <ShoppingCartIcon className="w-6 h-6" />
        <span 
          className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Your Cart ({itemCount})</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close cart preview"
              >
                ✕
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex py-3 border-b border-gray-100">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.imageUrl || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4">

              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    View Cart
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
