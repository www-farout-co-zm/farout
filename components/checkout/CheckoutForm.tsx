'use client';

import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';

interface CheckoutFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  step: 'customer' | 'shipping';
}

export default function CheckoutForm({ formData, onInputChange, step }: CheckoutFormProps) {
  const isCustomerStep = step === 'customer';
  const isShippingStep = step === 'shipping';
  
  const renderCustomerFields = () => (
    <>
      <h2 className="text-lg font-medium mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            required
          />
        </div>
      </div>
      
      <h2 className="text-lg font-medium mt-8 mb-4">Billing Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="apartment" className="text-gray-500 font-normal">
            Apartment, suite, etc. (optional)
          </Label>
          <Input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={onInputChange}
          />
        </div>
        
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="country">Country/Region</Label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={onInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={onInputChange}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="zipCode">ZIP / Postal code</Label>
          <Input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={onInputChange}
            required
          />
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="saveInfo" 
            name="saveInfo"
            checked={formData.saveInfo}
            onCheckedChange={(checked) => 
              onInputChange({
                target: { name: 'saveInfo', checked },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          <label
            htmlFor="saveInfo"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Save this information for next time
          </label>
        </div>
      </div>
    </>
  );
  
  const renderShippingFields = () => (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <Checkbox 
          id="shippingSameAsBilling" 
          name="shippingSameAsBilling"
          checked={formData.shippingSameAsBilling}
          onCheckedChange={(checked) => 
            onInputChange({
              target: { name: 'shippingSameAsBilling', checked },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <label
          htmlFor="shippingSameAsBilling"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Same as billing address
        </label>
      </div>
      
      {!formData.shippingSameAsBilling && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="shippingAddress.firstName">First name</Label>
              <Input
                type="text"
                id="shippingAddress.firstName"
                name="shippingAddress.firstName"
                value={formData.shippingAddress.firstName}
                onChange={onInputChange}
                required={!formData.shippingSameAsBilling}
              />
            </div>
            
            <div>
              <Label htmlFor="shippingAddress.lastName">Last name</Label>
              <Input
                type="text"
                id="shippingAddress.lastName"
                name="shippingAddress.lastName"
                value={formData.shippingAddress.lastName}
                onChange={onInputChange}
                required={!formData.shippingSameAsBilling}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="shippingAddress.address">Address</Label>
              <Input
                type="text"
                id="shippingAddress.address"
                name="shippingAddress.address"
                value={formData.shippingAddress.address}
                onChange={onInputChange}
                required={!formData.shippingSameAsBilling}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="shippingAddress.apartment" className="text-gray-500 font-normal">
                Apartment, suite, etc. (optional)
              </Label>
              <Input
                type="text"
                id="shippingAddress.apartment"
                name="shippingAddress.apartment"
                value={formData.shippingAddress.apartment}
                onChange={onInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="shippingAddress.city">City</Label>
              <Input
                type="text"
                id="shippingAddress.city"
                name="shippingAddress.city"
                value={formData.shippingAddress.city}
                onChange={onInputChange}
                required={!formData.shippingSameAsBilling}
              />
            </div>
            
            <div>
              <Label htmlFor="shippingAddress.country">Country/Region</Label>
              <select
                id="shippingAddress.country"
                name="shippingAddress.country"
                value={formData.shippingAddress.country}
                onChange={onInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required={!formData.shippingSameAsBilling}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="shippingAddress.state">State</Label>
              <Input
                type="text"
                id="shippingAddress.state"
                name="shippingAddress.state"
                value={formData.shippingAddress.state}
                onChange={onInputChange}
                required={!formData.shippingSameAsBilling}
              />
            </div>
            
            <div>
              <Label htmlFor="shippingAddress.zipCode">ZIP / Postal code</Label>
              <Input
                type="text"
                id="shippingAddress.zipCode"
                name="shippingAddress.zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={onInputChange}
                required={!formData.shippingSameAsBilling}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      {isCustomerStep && renderCustomerFields()}
      {isShippingStep && renderShippingFields()}
    </div>
  );
}
