import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items?: any[]; // Optional items prop for flexibility
}

export default function OrderSummary({ items: propItems }: OrderSummaryProps = {}) {
  const { items: contextItems, itemCount, cartTotal } = useCart();
  const items = propItems || contextItems;
  
  // Pricing information removed as per requirements

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2 border-b border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-xs">No Image</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-gray-900 truncate">{item.name}</h3>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>

          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-3">
        <p className="text-sm text-gray-600">
          For pricing and shipping information, please contact us.
        </p>
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        By placing your order, you agree to our{' '}
        <Link href="/terms" className="text-black hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-black hover:underline">
          Privacy Policy
        </Link>.
      </p>
    </div>
  );
}
