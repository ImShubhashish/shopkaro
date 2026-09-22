import React, { useState } from 'react';
import { Breadcrumb, Card, Form, Input, Button, Select, Collapse, message, Tag } from 'antd';
import { 
  Home, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  HelpCircle, 
  Package, 
  RefreshCw, 
  ShieldCheck, 
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

export const ContactPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (_values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const generatedTicket = 'TK-' + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setSubmitted(true);
      message.success('Support ticket created successfully!');
    }, 800);
  };

  const handleReset = () => {
    form.resetFields();
    setSubmitted(false);
  };

  const faqItems = [
    {
      key: '1',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <Package className="w-4 h-4 text-indigo-600" /> How can I track my order status?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          You can track your order directly by navigating to the <Link to="/orders" className="text-indigo-600 font-semibold hover:underline">My Orders</Link> page. Live updates are provided from dispatch to doorstep delivery.
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-indigo-600" /> What is ShopKaro's return & refund policy?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          We offer a hassle-free 7-day return policy for eligible products. Refunds are initiated instantly back to your original payment method or ShopKaro wallet once the returned item passes quality verification.
        </p>
      ),
    },
    {
      key: '3',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600" /> Are payment transactions secure on ShopKaro?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          Yes! All payments are processed through 256-bit SSL encrypted gateways complying with PCI-DSS standards. We support UPI, Cards, Net Banking, and Cash on Delivery.
        </p>
      ),
    },
    {
      key: '4',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <Headphones className="w-4 h-4 text-indigo-600" /> How quickly will support respond to my inquiry?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          Our dedicated Customer Experience team responds to all queries within 2 to 4 business hours. Urgent delivery or account queries receive priority resolution.
        </p>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb
        items={[
          {
            title: (
              <span className="flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </span>
            ),
            href: '/',
          },
          { title: 'Help Center & Contact Support' },
        ]}
      />

      {/* Hero Header Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-12 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10">
          <Headphones className="w-96 h-96" />
        </div>
        <div className="max-w-2xl relative z-10 space-y-3">
          <Tag color="indigo" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            24/7 Customer Support
          </Tag>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            We're Here to Help You
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Have questions about your order, shipping, returns, or technical support? Our dedicated ShopKaro Help Center team is available around the clock to assist you.
          </p>
        </div>
      </div>

      {/* Contact Quick Cards (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Toll-Free Support</h3>
              <p className="text-xs text-slate-500">Mon - Sat (9:00 AM - 9:00 PM IST)</p>
              <a href="tel:18001234567" className="text-indigo-600 font-bold text-sm hover:underline block pt-1">
                +1800-123-4567
              </a>
            </div>
          </div>
        </Card>

        <Card hoverable className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Email Assistance</h3>
              <p className="text-xs text-slate-500">24/7 Response within 2 hours</p>
              <a href="mailto:support@shopkaro.com" className="text-emerald-600 font-bold text-sm hover:underline block pt-1">
                support@shopkaro.com
              </a>
            </div>
          </div>
        </Card>

        <Card hoverable className="rounded-2xl border-slate-200/80 shadow-xs hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Headquarters</h3>
              <p className="text-xs text-slate-500">ShopKaro Tech Park, Sector 62</p>
              <span className="text-slate-700 font-semibold text-xs block pt-1">
                Bengaluru, Karnataka 560103
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Support Form & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Contact Support Form */}
        <div className="lg:col-span-7">
          <Card className="rounded-2xl border border-slate-200/80 shadow-sm p-2 bg-white">
            <div className="mb-6 space-y-1">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" /> Send Us a Message
              </h2>
              <p className="text-xs text-slate-500">Fill out the details below to raise a priority support ticket.</p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Support Ticket Created!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Your request has been submitted. Reference Ticket ID: <span className="font-mono font-bold text-indigo-600 text-sm bg-indigo-50 px-2 py-0.5 rounded">{ticketId}</span>
                  </p>
                  <p className="text-xs text-slate-400">Our customer team will send confirmation and status updates to your email.</p>
                </div>
                <Button 
                  type="default" 
                  onClick={handleReset}
                  className="rounded-xl px-6 font-semibold text-xs mt-2"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ category: 'Order Inquiry' }}
                requiredMark={false}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    label={<span className="font-semibold text-xs text-slate-700">Full Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="e.g. Shubhashish Bhattacharya" className="rounded-xl h-10" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<span className="font-semibold text-xs text-slate-700">Email Address</span>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Enter a valid email' }
                    ]}
                  >
                    <Input placeholder="e.g. shubh@example.com" className="rounded-xl h-10" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="orderId"
                    label={<span className="font-semibold text-xs text-slate-700">Order ID (Optional)</span>}
                  >
                    <Input placeholder="e.g. ORD-98214" className="rounded-xl h-10" />
                  </Form.Item>

                  <Form.Item
                    name="category"
                    label={<span className="font-semibold text-xs text-slate-700">Inquiry Category</span>}
                    rules={[{ required: true }]}
                  >
                    <Select className="rounded-xl h-10">
                      <Option value="Order Inquiry">📦 Order & Tracking Status</Option>
                      <Option value="Returns & Refund">🔄 Returns & Refund Request</Option>
                      <Option value="Payment Issue">💳 Payment / Billing Issue</Option>
                      <Option value="Product Details">🏷️ Product & Warranty Details</Option>
                      <Option value="Other">💬 General Feedback</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  name="subject"
                  label={<span className="font-semibold text-xs text-slate-700">Subject</span>}
                  rules={[{ required: true, message: 'Please enter a subject line' }]}
                >
                  <Input placeholder="Brief summary of your query" className="rounded-xl h-10" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label={<span className="font-semibold text-xs text-slate-700">Detailed Message</span>}
                  rules={[{ required: true, message: 'Please provide message details' }]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Describe how we can help you in detail..." 
                    className="rounded-xl"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="bg-indigo-600 hover:bg-indigo-500 rounded-xl h-11 w-full font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Support Request</span>
                </Button>
              </Form>
            )}
          </Card>
        </div>

        {/* Right Column: Frequently Asked Questions & Hours */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="rounded-2xl border border-slate-200/80 shadow-sm p-2 bg-white">
            <div className="mb-4 space-y-1">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">Instant answers to common customer queries.</p>
            </div>

            <Collapse 
              items={faqItems} 
              defaultActiveKey={['1']}
              ghost
              className="bg-transparent"
            />
          </Card>

          {/* Operating Hours Box */}
          <Card className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-2">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Customer Help Center Operating Hours</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our live support desk operates <strong>Monday – Saturday from 9:00 AM to 9:00 PM IST</strong>. Messages sent outside office hours will be addressed promptly the next business morning.
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
