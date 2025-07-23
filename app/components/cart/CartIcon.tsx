'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCartIcon } from '@/app/components/ui/ShoppingCartIcon';

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link 
      href="/cart" 
      className="relative p-2 text-gray-700 hover:text-black transition-colors"
      aria-label={`Shopping Cart (${itemCount} items)`}
    >
      <ShoppingCartIcon className="w-5 h-5" />
      {itemCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          aria-hidden="true"
        >
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}
