'use client';

import { CartItem as CartItemType } from '@/contexts/CartContext';
import Image from 'next/image';
import { Button } from '../ui/button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="p-4 flex border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={item.imageUrl || '/placeholder-product.jpg'}
          alt={item.name}
          width={96}
          height={96}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              -
            </Button>
            <span className="px-3 py-1">{item.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-500 hover:bg-transparent"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
