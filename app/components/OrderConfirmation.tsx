'use client';

import React from 'react';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';

interface OrderConfirmationProps {
  orderData: {
    orderId: string;
    orderNumber: string;
    email: string;
  } | null;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderData }) => {
  const router = useRouter();

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Order Confirmed!</h2>
      <p>Thank you for your order.</p>
      {orderData && (
        <div className="text-left inline-block bg-gray-100 p-4 rounded-lg">
          <p><strong>Order ID:</strong> {orderData.orderId}</p>
          <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
          <p><strong>Email:</strong> {orderData.email}</p>
        </div>
      )}
      <Button onClick={() => router.push('/')}>Continue Shopping</Button>
    </div>
  );
};

export default OrderConfirmation;
