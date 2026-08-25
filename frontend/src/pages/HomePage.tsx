import React from 'react';
import { Card } from 'antd';
import { ShoppingBag } from 'lucide-react';
import HeroCarousel from '../components/home/HeroCarousel';
import PromoBannerSection from '../components/home/PromoBannerSection';


export const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Offer Carousel */}
      <HeroCarousel />


      {/* 3-Column Promo Banner Grid */}
      <PromoBannerSection />



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
