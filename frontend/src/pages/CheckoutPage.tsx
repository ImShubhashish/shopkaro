import React, { useState } from 'react';
import { Breadcrumb, Steps, Form, Input, Radio, Button, Card, Divider, message } from 'antd';
import { Home, MapPin, CreditCard, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [addressForm] = Form.useForm();
  const { cart, subtotal, clearCart } = useCart();


  const shippingCost = subtotal > 2000 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const grandTotal = subtotal + shippingCost + tax;

  const handleNextAddress = async () => {
    try {
      await addressForm.validateFields();
      setCurrentStep(1);
    } catch {
      message.error('Please complete all required shipping fields');
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setCurrentStep(2);
      clearCart();
      message.success('Payment successful! Order placed.');
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6 bg-white rounded-3xl border border-slate-200 shadow-md">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Order Placed Successfully!</h1>
        <p className="text-slate-600 text-base max-w-md mx-auto">
          Thank you for shopping with ShopKaro. Your order <strong className="text-indigo-600">#SK-89421</strong> has been confirmed and is being packed.
        </p>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
          <div className="font-semibold text-slate-800">Estimated Delivery</div>
          <div className="text-slate-600">2 - 3 Business Days via Express Shipping</div>
        </div>
        <div className="pt-4 flex justify-center gap-4">
          <Link to="/orders">
            <Button size="large" className="rounded-xl border-slate-300">View My Orders</Button>
          </Link>
          <Link to="/">
            <Button type="primary" size="large" className="bg-indigo-600 rounded-xl font-bold">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { title: <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</span>, href: '/' },
          { title: 'Checkout' },
        ]}
      />

      {/* Checkout Stepper */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs max-w-4xl mx-auto">
        <Steps
          current={currentStep}
          items={[
            { title: 'Shipping Address', icon: <MapPin className="w-4 h-4" /> },
            { title: 'Payment Method', icon: <CreditCard className="w-4 h-4" /> },
            { title: 'Confirmation', icon: <CheckCircle2 className="w-4 h-4" /> },
          ]}
        />
      </div>

      {/* Checkout Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Multi-Step Forms */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          
          {/* Step 1: Shipping Address Form */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span>Shipping Address</span>
              </h2>

              <Form form={addressForm} layout="vertical" requiredMark={false} size="large">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="Shubhashish Bhattacharya" className="rounded-xl" />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="+91 9876543210" className="rounded-xl" />
                  </Form.Item>
                </div>

                <Form.Item name="street" label="Street Address" rules={[{ required: true, message: 'Required' }]}>
                  <Input placeholder="House No, Street, Area" className="rounded-xl" />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Form.Item name="city" label="City" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="Bengaluru" className="rounded-xl" />
                  </Form.Item>
                  <Form.Item name="state" label="State" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="Karnataka" className="rounded-xl" />
                  </Form.Item>
                  <Form.Item name="pincode" label="PIN Code" rules={[{ required: true, message: 'Required' }]}>
                    <Input placeholder="560001" className="rounded-xl" />
                  </Form.Item>
                </div>

                <Button
                  type="primary"
                  size="large"
                  onClick={handleNextAddress}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-2xl h-12 font-bold text-base flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Form>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span>Select Payment Method</span>
              </h2>

              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="flex flex-col gap-3 w-full"
              >
                <Card className={`rounded-2xl border transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200'}`}>
                  <Radio value="card" className="w-full font-semibold text-slate-800">
                    Credit / Debit Card (Stripe Encrypted)
                  </Radio>
                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Card Number</label>
                        <Input 
                          prefix={<CreditCard className="w-4 h-4 text-slate-400 mr-2" />}
                          placeholder="4242 •••• •••• 4242" 
                          maxLength={19}
                          className="rounded-xl py-2.5" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 block">Expiry Date</label>
                          <Input placeholder="MM / YY" maxLength={5} className="rounded-xl py-2.5" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-slate-700 block">Security Code (CVC)</label>
                          <Input placeholder="123" maxLength={4} className="rounded-xl py-2.5" />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card className={`rounded-2xl border transition-all cursor-pointer ${paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200'}`}>
                  <Radio value="upi" className="w-full font-semibold text-slate-800">
                    UPI / QR Payment (GPay, PhonePe, Paytm)
                  </Radio>
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <Input placeholder="Enter UPI ID (e.g. user@okhdfcbank)" className="rounded-xl" />
                    </div>
                  )}
                </Card>

                <Card className={`rounded-2xl border transition-all cursor-pointer ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/40' : 'border-slate-200'}`}>
                  <Radio value="cod" className="w-full font-semibold text-slate-800">
                    Cash on Delivery (COD)
                  </Radio>
                </Card>
              </Radio.Group>

              <div className="flex gap-4 pt-4">
                <Button size="large" onClick={() => setCurrentStep(0)} className="rounded-2xl h-12 flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  type="primary"
                  size="large"
                  loading={isProcessing}
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 rounded-2xl h-12 font-bold text-base shadow-lg shadow-indigo-200"
                >
                  Pay ₹{grandTotal.toLocaleString('en-IN')} & Place Order
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Order Summary Side Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <span>Order Summary</span>
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                  <div className="truncate">
                    <span className="font-semibold text-slate-800 block truncate">{product.name}</span>
                    <span className="text-slate-400">Qty: {quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 whitespace-nowrap ml-2">
                  ₹{(product.price * quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <Divider className="my-2" />

          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-800">
                {shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span className="font-semibold text-slate-800">₹{tax.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Divider className="my-2" />

          <div className="flex justify-between items-baseline pt-1">
            <span className="text-base font-extrabold text-slate-900">Total Amount</span>
            <span className="text-2xl font-black text-indigo-600">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Safe Checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
