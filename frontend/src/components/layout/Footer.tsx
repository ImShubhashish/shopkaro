import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';
import { Input, Button } from 'antd';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders over $50 across India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 rounded-lg bg-emerald-600/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Secure Payments</h4>
              <p className="text-xs text-slate-400 mt-0.5">Encrypted Stripe checkout & UPI support</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="p-3 rounded-lg bg-amber-600/20 text-amber-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">No questions asked hassle-free refunds</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold">Shop<span className="text-indigo-400">Karo</span></span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your premier online shopping destination for curated fashion, electronics, and lifestyle products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Shop Categories</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/products?category=electronics" className="hover:text-white transition-colors">Electronics & Tech</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-white transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/products?category=home" className="hover:text-white transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/products?category=beauty" className="hover:text-white transition-colors">Beauty & Personal Care</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="font-semibold text-white text-sm mb-4 tracking-wider uppercase">Customer Care</h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Help Center / Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h5 className="font-semibold text-white text-sm tracking-wider uppercase">Subscribe for Offers</h5>
            <p className="text-xs text-slate-400">Get $10 off your first purchase and exclusive sales alerts.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email..." 
                prefix={<Mail className="w-4 h-4 text-slate-500 mr-1" />}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg"
              />
              <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700 rounded-lg">Join</Button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credit */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShopKaro. Built with React, Ant Design, Tailwind CSS & Express.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by Shubhashish Bhattacharya</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
