'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { paymentSchema, type PaymentFormValues } from '@/lib/validations';

interface PaymentFormProps {
  onPaymentComplete: (paymentData: PaymentFormValues) => void;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({

  onPaymentComplete,
  isProcessing,
}) => {
  const [paymentDetails, setPaymentDetails] = React.useState<PaymentFormValues>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof PaymentFormValues, string>>>({});

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof PaymentFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const result = paymentSchema.safeParse(paymentDetails);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PaymentFormValues, string>> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (
          field === 'cardNumber' ||
          field === 'expiryDate' ||
          field === 'cvv' ||
          field === 'cardholderName'
        ) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }
    
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
          className={`w-full p-2 border rounded ${errors.cardNumber ? 'border-red-500' : ''}`}
        />
        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
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
            className={`w-full p-2 border rounded ${errors.expiryDate ? 'border-red-500' : ''}`}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
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
            className={`w-full p-2 border rounded ${errors.cvv ? 'border-red-500' : ''}`}
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
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
          className={`w-full p-2 border rounded ${errors.cardholderName ? 'border-red-500' : ''}`}
        />
        {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
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
