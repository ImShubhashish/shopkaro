import React from 'react';
import { Breadcrumb, Card, Tag, Timeline, Collapse } from 'antd';
import { 
  Home, 
  RefreshCw, 
  RotateCcw, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  Truck, 
  PackageCheck, 
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReturnsPage: React.FC = () => {
  const faqItems = [
    {
      key: '1',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-indigo-600" /> How do I initiate a return request?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          Navigate to your <Link to="/orders" className="text-indigo-600 font-semibold hover:underline">My Orders</Link> page, select the item you wish to return, and click <strong>Return / Exchange Item</strong>. Select the return reason and choose your preferred pickup address.
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-indigo-600" /> When and how will I receive my refund?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          Once our courier agent picks up the item and performs door quality checks, refunds are processed within 24 to 48 hours back to your original payment mode (UPI, Credit/Debit Card) or instantly to your ShopKaro Store Balance.
        </p>
      ),
    },
    {
      key: '3',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <Truck className="w-4 h-4 text-indigo-600" /> Is reverse pickup free?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          Yes! Doorstep reverse pickup is <strong>100% FREE</strong> across all eligible PIN codes in India. You do not need to pay any shipping charge to the courier agent.
        </p>
      ),
    },
    {
      key: '4',
      label: (
        <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-indigo-600" /> What items are non-returnable?
        </span>
      ),
      children: (
        <p className="text-slate-600 text-xs leading-relaxed">
          Personal care items, opened cosmetics, innerwear, and items marked as "Non-Returnable" on the product detail page are excluded from returns due to hygiene and health regulations.
        </p>
      ),
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
          { title: 'Returns & Refund Policy' },
        ]}
      />

      {/* Hero Header Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-12 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 opacity-10 translate-x-10 -translate-y-10">
          <RefreshCw className="w-96 h-96" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <Tag color="indigo" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Easy 7-Day Doorstep Returns
          </Tag>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Returns & Refund Policy
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            We want you to love everything you buy from ShopKaro! If you are not 100% satisfied with your order, we offer a hassle-free 7-day doorstep return and replacement guarantee with zero hidden fees.
          </p>
        </div>
      </div>

      {/* Feature Badges (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">7-Day Window</h4>
              <p className="text-[11px] text-slate-500">Hassle-free return window</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Free Doorstep Pickup</h4>
              <p className="text-[11px] text-slate-500">Zero return delivery charge</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Fast 24h Refund</h4>
              <p className="text-[11px] text-slate-500">Direct to bank or wallet</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-xs bg-white p-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Guaranteed Quality</h4>
              <p className="text-[11px] text-slate-500">Replacements for defective items</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 4-Step Return Process Timeline */}
      <Card className="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-2">
        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-indigo-600" /> How the Return Process Works
          </h2>
          <p className="text-xs text-slate-500">Complete return lifecycle in 4 simple steps.</p>
        </div>

        <Timeline
          mode="alternate"
          items={[
            {
              dot: <RotateCcw className="w-5 h-5 text-indigo-600" />,
              children: (
                <div className="p-2">
                  <h4 className="font-bold text-slate-900 text-sm">Step 1: Submit Request Online</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    Go to <Link to="/orders" className="text-indigo-600 font-semibold hover:underline">My Orders</Link>, click Return on your item, and choose your preferred return or exchange reason.
                  </p>
                </div>
              ),
            },
            {
              dot: <Truck className="w-5 h-5 text-indigo-600" />,
              children: (
                <div className="p-2">
                  <h4 className="font-bold text-slate-900 text-sm">Step 2: Free Pickup Scheduled</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    Our logistics partner picks up the item directly from your address within 24–48 hours. No printing labels required.
                  </p>
                </div>
              ),
            },
            {
              dot: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
              children: (
                <div className="p-2">
                  <h4 className="font-bold text-slate-900 text-sm">Step 3: Quality Check at Doorstep</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    The agent verifies the product tags, un-damaged condition, and original brand packaging before scanning pickup.
                  </p>
                </div>
              ),
            },
            {
              dot: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
              children: (
                <div className="p-2">
                  <h4 className="font-bold text-slate-900 text-sm">Step 4: Instant Refund Transfer</h4>
                  <p className="text-slate-600 text-xs mt-1">
                    Refund is triggered instantly to your UPI / source card or credited as instant store balance.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Main FAQ & Customer Support Assistance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        
        {/* Left Column: FAQ Collapse Accordion */}
        <div className="lg:col-span-7">
          <Card className="rounded-2xl border border-slate-200/80 shadow-sm p-2 bg-white h-full">
            <div className="mb-4 space-y-1">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-500">Quick solutions regarding returns, exchanges, and refunds.</p>
            </div>

            <Collapse 
              items={faqItems} 
              defaultActiveKey={['1']}
              ghost
              className="bg-transparent"
            />
          </Card>
        </div>

        {/* Right Column: Support Assistance & Eligibility Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="rounded-2xl border border-slate-200/80 shadow-xs bg-white p-2">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Return Eligibility Checklist
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Product must be in unused, original condition.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Brand tags, manuals, and original box must be intact.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Return request must be raised within 7 days of delivery.
              </li>
            </ul>
          </Card>

          <Card className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-2">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-slate-900 text-xs">Need Assistance With a Damaged or Defective Item?</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If you received a damaged item, please raise a ticket on our <Link to="/contact" className="text-indigo-600 font-semibold hover:underline">Contact Support Page</Link> with unboxing images for immediate priority replacement.
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ReturnsPage;
