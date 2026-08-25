import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 md:p-14 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <Tag color="indigo" className="bg-indigo-500/20 border-indigo-400/30 text-indigo-200 px-3 py-1 text-sm rounded-full inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Festive Special Offer
          </Tag>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Upgrade Your Lifestyle with ShopKaro
          </h1>
          <p className="text-indigo-200 text-base md:text-lg leading-relaxed">
            Discover top-tier electronics, fashion, and accessories with free express shipping across India.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link to="/products">
              <Button type="primary" size="large" shape="round" className="bg-indigo-600 hover:bg-indigo-500 h-12 px-8 font-semibold text-base flex items-center gap-2">
                <span>Shop Catalog Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Featured Categories Quick Nav */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Electronics', 'Fashion', 'Home & Living', 'Beauty & Care'].map((cat) => (
            <Card key={cat} hoverable className="rounded-2xl border-slate-200 shadow-xs hover:shadow-md text-center py-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-800 text-base">{cat}</h3>
              <p className="text-xs text-slate-500 mt-1">Explore Items &rarr;</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
