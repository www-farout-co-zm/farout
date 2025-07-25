'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import OrderConfirmation from '../components/OrderConfirmation';

type CheckoutStep = 'customer' | 'shipping' | 'payment' | 'review' | 'confirmation';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  imageUrl?: string;
}

interface OrderData {
  orderId: string;
  orderNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
}

const CHECKOUT_STEPS: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review', 'confirmation'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: ''
  });
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentIndex = CHECKOUT_STEPS.indexOf(currentStep);
    if (currentIndex < CHECKOUT_STEPS.length - 1) {
      setCurrentStep(CHECKOUT_STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = CHECKOUT_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(CHECKOUT_STEPS[currentIndex - 1]);
    } else {
      router.back();
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderData: OrderData = {
        orderId: `ORD-${Date.now()}`,
        orderNumber: `FAR-${Math.floor(10000 + Math.random() * 90000)}`,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          country: formData.country,
          state: formData.state,
          zipCode: formData.zipCode
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        }))
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderData(orderData);
      clearCart();

      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = (paymentData: { cardNumber: string; expiryDate: string; cvv: string; cardholderName: string }) => {
    // Simulate payment processing
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Payment data received:', paymentData);
      setIsProcessing(false);
      // Move to next step (review)
      const currentIndex = CHECKOUT_STEPS.indexOf(currentStep);
      if (currentIndex < CHECKOUT_STEPS.length - 1) {
        setCurrentStep(CHECKOUT_STEPS[currentIndex + 1]);
      }
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'customer':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <Button type="submit" className="w-full">
              Continue to Shipping
            </Button>
          </form>
        );

      case 'shipping':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit">Continue to Payment</Button>
            </div>
          </form>
        );

      case 'payment':
        return (
          <PaymentForm
            onPaymentComplete={handlePaymentComplete}
            isProcessing={isProcessing}
          />
        );

      case 'review':
        return (
          <>
            <OrderSummary formData={formData} />
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={handleSubmitOrder} 
                disabled={isSubmitting}
                className="bg-black hover:bg-gray-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : 'Place Order'}
              </Button>
            </div>
          </>
        );

      case 'confirmation':
        return (
          <OrderConfirmation orderData={orderData} />
        );

      default:
        return null;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between mb-8">
          {['customer', 'shipping', 'payment', 'review'].map((step, index) => {
            const stepIndex = index + 1;
            const isActive = currentStep === step;
            const isCompleted = 
              ['shipping', 'payment', 'review', 'confirmation'].includes(currentStep) && 
              index < ['shipping', 'payment', 'review', 'confirmation'].indexOf(currentStep);
            
            return (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive || isCompleted 
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? '✓' : stepIndex}
                </div>
                <span className="text-xs mt-1 capitalize">{step}</span>
              </div>
            );
          })}
        </div>
        {renderStep()}
      </div>
    </div>
  );
}


