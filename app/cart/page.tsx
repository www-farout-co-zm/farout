'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { ShoppingCartIcon } from '@/app/components/ui/ShoppingCartIcon';
import { CartItem } from '@/app/components/cart/CartItem';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <ShoppingCartIcon className="w-full h-full" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {items.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onUpdateQuantity={updateQuantity} 
                onRemove={removeFromCart} 
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Contact us for pricing and shipping information.
              </p>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-base font-medium text-gray-900">
                  <span>Your Selection</span>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full">Checkout</Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <p>or{' '}
                  <Link href="/shop" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
