'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

interface OrderSummaryProps {
  formData: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  formData
}) => {
  const { items } = useCart();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Review Your Order</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Contact Information</h3>
          <p>{formData.email}</p>
          <p>{formData.phone}</p>
        </div>
        <div>
          <h3 className="font-medium">Shipping Address</h3>
          <p>{formData.firstName} {formData.lastName}</p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
          <p>{formData.country}</p>
        </div>
        <div>
          <h3 className="font-medium">Items</h3>
          {items.map(item => (
            <div key={item.id} className="flex justify-between py-2">
              <div className="flex items-center space-x-2">
                {item.imageUrl && (
                  <Image 
                    src={item.imageUrl || '/placeholder-product.jpg'} 
                    alt={item.name} 
                    width={48} 
                    height={48} 
                    className="object-cover rounded"
                  />
                )}
                <span>{item.name}</span>
              </div>
              <span>Qty: {item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
