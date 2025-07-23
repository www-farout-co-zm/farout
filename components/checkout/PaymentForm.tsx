'use client';

import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function PaymentForm({ formData, onInputChange }: PaymentFormProps) {
  const paymentMethods = [
    { id: 'credit-card', label: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'paypal', label: 'PayPal', icon: <span className="text-blue-600 font-bold">PayPal</span> },
    { id: 'apple-pay', label: 'Apple Pay', icon: <span className="font-semibold"> Pay</span> },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Payment Method</h2>
      
      <RadioGroup 
        value={formData.paymentMethod}
        onValueChange={(value) => 
          onInputChange({
            target: { name: 'paymentMethod', value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        className="space-y-3"
      >
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center space-x-3">
            <RadioGroupItem value={method.id} id={method.id} />
            <div className="flex items-center gap-2">
              {method.icon}
              <Label htmlFor={method.id} className="font-normal cursor-pointer">
                {method.label}
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      {formData.paymentMethod === 'credit-card' && (
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Credit / Debit Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card number</Label>
              <Input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={onInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cardName">Name on card</Label>
              <Input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={onInputChange}
                placeholder="John Smith"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cardExpiry">Expiry date</Label>
                <Input
                  type="text"
                  id="cardExpiry"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={onInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cardCvc">Security code</Label>
                <div className="relative">
                  <Input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={onInputChange}
                    placeholder="CVC"
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {formData.paymentMethod === 'paypal' && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
          <p className="mb-4">You'll be redirected to PayPal to complete your purchase securely.</p>
          <div className="text-sm text-gray-600">
            After clicking "Continue to Review", you'll be redirected to PayPal to complete your purchase securely.
          </div>
        </div>
      )}
      
      {formData.paymentMethod === 'apple-pay' && (
        <div className="bg-black/5 border border-gray-200 rounded-lg p-6 text-center">
          <p className="mb-4">Complete your purchase with Apple Pay</p>
          <div className="text-sm text-gray-600">
            After clicking "Continue to Review", you'll be prompted to complete your purchase with Apple Pay.
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lock className="w-4 h-4 text-gray-400" />
        <span>Your payment is secure and encrypted</span>
      </div>
    </div>
  );
}
