import React from 'react';
import { Breadcrumb, Card, Table, Tag, Timeline } from 'antd';
import {
  Home,
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  Zap,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShippingPolicyPage: React.FC = () => {
  const shippingTiers = [
    {
      key: '1',
      tier: 'Standard Delivery',
      timeframe: '3 – 5 Business Days',
      cost: 'FREE on orders over ₹499 (or ₹49 flat)',
      coverage: 'All PINCodes across India (19,000+ codes)',
    },
    {
      key: '2',
      tier: 'Express Air Shipping',
      timeframe: '1 – 2 Business Days',
      cost: '₹99 (Free for ShopKaro Prime Members)',
      coverage: 'Metro cities & major Tier-1 urban centers',
    },
    {
      key: '3',
      tier: 'Same-Day Local Delivery',
      timeframe: 'Delivered before 9:00 PM today',
      cost: '₹149 (Order before 11:30 AM IST)',
      coverage: 'Select metro regions (Bengaluru, NCR, Mumbai)',
    },
  ];

  const columns = [
    {
      title: 'Shipping Option',
      dataIndex: 'tier',
      key: 'tier',
      render: (text: string) => (
        <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
          {text}
        </span>
      ),
    },
    {
      title: 'Estimated Timeframe',
      dataIndex: 'timeframe',
      key: 'timeframe',
      render: (text: string) => (
        <span className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          {text}
        </span>
      ),
    },
    {
      title: 'Shipping Charges',
      dataIndex: 'cost',
      key: 'cost',
      render: (text: string) => (
        <Tag color="indigo" className="font-semibold text-xs border-indigo-200 px-2.5 py-0.5 rounded-md">
          {text}
        </Tag>
      ),
    },
    {
      title: 'Coverage Area',
      dataIndex: 'coverage',
      key: 'coverage',
      render: (text: string) => <span className="text-slate-600 text-xs">{text}</span>,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Breadcrumb Navigation */}
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
          { title: 'Shipping & Delivery Policy' },
        ]}
      />

      {/* Hero Banner Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-12 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10">
          <Truck className="w-96 h-96" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <Tag color="indigo" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Fast, Reliable & Insured Shipping
          </Tag>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Shipping & Logistics Policy
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            At ShopKaro, we prioritize delivering your orders swiftly, securely, and transparently. We partner with top-tier courier logistics (BlueDart, Delhivery, Expressbees, and Shadowfax) to cover 19,000+ PIN codes across India.
          </p>
        </div>
      </div>

      {/* Feature Value Highlights (4 Badges) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Dispatch within 24 Hours</h4>
              <p className="text-[11px] text-slate-500">Same-day processing on weekdays</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">100% Insured Transit</h4>
              <p className="text-[11px] text-slate-500">Full cover against damage or loss</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Live GPS Order Tracking</h4>
              <p className="text-[11px] text-slate-500">Real-time SMS & email notifications</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Pan-India Reach</h4>
              <p className="text-[11px] text-slate-500">Serving over 19,000+ PIN codes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Shipping Options & Rates Table */}
      <Card className="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-2">
        <div className="mb-4 space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-indigo-600" /> Shipping Methods & Delivery Timelines
          </h2>
          <p className="text-xs text-slate-500">Choose the delivery speed that best fits your order needs at checkout.</p>
        </div>

        <Table
          columns={columns}
          dataSource={shippingTiers}
          pagination={false}
          scroll={undefined}
        />
      </Card>

      {/* Fulfillment Workflow Timeline & Policy Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

        {/* Left Column: Order Processing Workflow Timeline */}
        <div className="lg:col-span-6">
          <Card className="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-2 h-full">
            <div className="mb-6 space-y-1">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" /> Order Fulfillment Lifecycle
              </h3>
              <p className="text-xs text-slate-500">How your package travels from our fulfillment center to your door.</p>
            </div>

            <Timeline
              items={[
                {
                  dot: <CheckCircle2 className="w-5 h-5 text-indigo-600" />,
                  children: (
                    <div className="pb-3">
                      <h5 className="font-bold text-slate-900 text-xs">1. Order Confirmation & Verification</h5>
                      <p className="text-slate-600 text-xs mt-0.5">
                        Immediately upon checkout, your order is verified and allocated to our nearest automated fulfillment center.
                      </p>
                    </div>
                  ),
                },
                {
                  dot: <Building2 className="w-5 h-5 text-indigo-600" />,
                  children: (
                    <div className="pb-3">
                      <h5 className="font-bold text-slate-900 text-xs">2. Packaging & Quality Inspection</h5>
                      <p className="text-slate-600 text-xs mt-0.5">
                        Items are double-checked for quality, sealed in tamper-proof bubble packaging, and assigned a unique tracking AWB barcode.
                      </p>
                    </div>
                  ),
                },
                {
                  dot: <Truck className="w-5 h-5 text-indigo-600" />,
                  children: (
                    <div className="pb-3">
                      <h5 className="font-bold text-slate-900 text-xs">3. Courier Handover & Air/Surface Transit</h5>
                      <p className="text-slate-600 text-xs mt-0.5">
                        Handed over to top logistics partners. Live tracking details are dispatched instantly via SMS and WhatsApp.
                      </p>
                    </div>
                  ),
                },
                {
                  dot: <MapPin className="w-5 h-5 text-emerald-600" />,
                  children: (
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">4. Doorstep Delivery & OTP Verification</h5>
                      <p className="text-slate-600 text-xs mt-0.5">
                        The delivery partner contacts you on delivery day. Contactless OTP verification ensures safe delivery to the recipient.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>

        {/* Right Column: Key Guidelines & Delivery Terms */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card className="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-2">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" /> Order Cut-Off Times & Holidays
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders placed before <strong>2:00 PM IST (Mon–Sat)</strong> are processed and dispatched on the same calendar day. Orders placed after 2:00 PM, on Sundays, or on public holidays will be dispatched on the next working business day.
            </p>
          </Card>

          <Card className="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-2">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Delivery Attempts & Incorrect Address Policy
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our courier partners make up to <strong>3 delivery attempts</strong> before returning a parcel to the warehouse. Please ensure correct phone numbers and landmark details are provided at checkout.
            </p>
          </Card>

          <Card className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-2">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-lg mt-0.5">
                <Truck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 text-xs">Need Assistance With an In-Transit Order?</h5>
                <p className="text-xs text-slate-600">
                  Track your package directly from <Link to="/orders" className="text-indigo-600 font-semibold hover:underline">My Orders</Link> or raise a delivery inquiry on our <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">Help Center Page</Link>.
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ShippingPolicyPage;
