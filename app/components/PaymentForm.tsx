'use client';

import React from 'react';
import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentFormProps {
  onPaymentComplete: (paymentData: { cardNumber: string; expiryDate: string; cvv: string; cardholderName: string }) => void;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({

  onPaymentComplete,
  isProcessing,
}) => {
  const [paymentDetails, setPaymentDetails] = React.useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPaymentComplete(paymentDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="0000 0000 0000 0000"
          required
          value={paymentDetails.cardNumber}
          onChange={handlePaymentInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            required
            value={paymentDetails.expiryDate}
            onChange={handlePaymentInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="123"
            required
            value={paymentDetails.cvv}
            onChange={handlePaymentInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
        <input
          type="text"
          name="cardholderName"
          placeholder="Full Name"
          required
          value={paymentDetails.cardholderName}
          onChange={handlePaymentInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        {/* Back button is handled by parent component */}
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : 'Continue to Review'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
