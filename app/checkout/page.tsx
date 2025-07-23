'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';

type CheckoutStep = 'customer' | 'shipping' | 'payment' | 'review' | 'confirmation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    phone: '',
    saveInfo: false,
    shippingSameAsBilling: true,
    shippingAddress: {
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      country: 'United States',
      state: '',
      zipCode: '',
    },
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name.startsWith('shippingAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'review') {
      setIsSubmitting(true);
      
      try {
        // In a real app, you would send this data to your backend
        console.log('Submitting order:', { items, formData });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate a fake order number for demo purposes
        const orderNumber = `FAROUT-${Math.floor(100000 + Math.random() * 900000)}`;
        
        setOrderData({
          orderNumber,
          items,
          shippingAddress: formData.shippingSameAsBilling 
            ? {
                name: `${formData.firstName} ${formData.lastName}`,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
              }
            : {
                name: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`,
                address: formData.shippingAddress.address,
                city: formData.shippingAddress.city,
                state: formData.shippingAddress.state,
                zipCode: formData.shippingAddress.zipCode,
                country: formData.shippingAddress.country,
              },
          subtotal: cartTotal,
          shipping: 9.99,
          tax: (cartTotal * 0.08).toFixed(2),
          total: (cartTotal + 9.99 + (cartTotal * 0.08)).toFixed(2),
          email: formData.email,
          phone: formData.phone,
        });
        
        // Clear cart after successful order
        clearCart();
        setCurrentStep('confirmation');
      } catch (error) {
        console.error('Error submitting order:', error);
        // Handle error (show error message to user)
      } finally {
        setIsSubmitting(false);
      }
      
      return;
    }
    
    // Move to next step
    const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: CheckoutStep[] = ['customer', 'shipping', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  if (itemCount === 0 && currentStep !== 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
        <Button onClick={() => router.push('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (currentStep === 'confirmation' && orderData) {
    return <OrderConfirmation order={orderData} />;
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-600 hover:text-black mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to cart
          </button>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main checkout form */}
            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>
                
                {/* Progress steps */}
                <div className="flex justify-between mb-8 relative">
                  {['customer', 'shipping', 'payment', 'review'].map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = step === currentStep;
                    const isCompleted = 
                      step === 'customer' && ['shipping', 'payment', 'review', 'confirmation'].includes(currentStep) ||
                      step === 'shipping' && ['payment', 'review', 'confirmation'].includes(currentStep) ||
                      step === 'payment' && ['review', 'confirmation'].includes(currentStep) ||
                      step === 'review' && currentStep === 'confirmation';
                    
                    return (
                      <div key={step} className="flex flex-col items-center z-10">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 ${
                            isActive || isCompleted 
                              ? 'bg-black text-white' 
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {isCompleted ? '✓' : stepNumber}
                        </div>
                        <span className="text-xs text-gray-600 capitalize">
                          {step === 'customer' ? 'Information' : step}
                        </span>
                      </div>
                    );
                  })}
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                    <div 
                      className="h-full bg-black transition-all duration-300"
                      style={{
                        width: currentStep === 'customer' 
                          ? '0%' 
                          : currentStep === 'shipping' 
                            ? '33.33%' 
                            : currentStep === 'payment' 
                              ? '66.66%' 
                              : '100%'
                      }}
                    />
                  </div>
                </div>
                
                {/* Form content */}
                <form onSubmit={handleSubmit}>
                  {currentStep === 'customer' && (
                    <CheckoutForm 
                      formData={formData} 
                      onInputChange={handleInputChange} 
                      step="customer"
                    />
                  )}
                  
                  {currentStep === 'shipping' && (
                    <CheckoutForm 
                      formData={formData} 
                      onInputChange={handleInputChange} 
                      step="shipping"
                    />
                  )}
                  
                  {currentStep === 'payment' && (
                    <PaymentForm 
                      formData={formData} 
                      onInputChange={handleInputChange} 
                    />
                  )}
                  
                  {currentStep === 'review' && (
                    <div>
                      <h2 className="text-lg font-medium mb-4">Review your order</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Contact Information</h3>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Shipping Address</h3>
                          <p>{formData.shippingSameAsBilling ? (
                            <>
                              {formData.firstName} {formData.lastName}<br />
                              {formData.address}<br />
                              {formData.apartment && <>{formData.apartment}<br /></>}
                              {formData.city}, {formData.state} {formData.zipCode}<br />
                              {formData.country}
                            </>
                          ) : (
                            <>
                              {formData.shippingAddress.firstName} {formData.shippingAddress.lastName}<br />
                              {formData.shippingAddress.address}<br />
                              {formData.shippingAddress.apartment && <>{formData.shippingAddress.apartment}<br /></>}
                              {formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.zipCode}<br />
                              {formData.shippingAddress.country}
                            </>
                          )}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Payment Method</h3>
                          <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between">
                    {currentStep !== 'customer' && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        Back
                      </Button>
                    )}
                    
                    <div className="ml-auto">
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : currentStep === 'review' ? (
                          'Place Order'
                        ) : (
                          'Continue to Shipping'
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="md:w-1/3">
              <OrderSummary items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
