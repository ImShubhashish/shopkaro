import React from 'react';
import { ConfigProvider, Button, Card } from 'antd';
import { ShoppingBag, Sparkles, ShieldCheck, Truck } from 'lucide-react';


const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4f46e5', // Indigo-600
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-center items-center p-6">
        <div className="max-w-3xl w-full text-center space-y-6">
          
          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>ShopKaro Modern Showcase Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Welcome to ShopKaro
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Full-Stack E-Commerce Application powered by React, Ant Design, Tailwind CSS, Node.js, and PostgreSQL.
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
            <Card className="bg-slate-800/80 border-slate-700/60 shadow-lg text-white">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Ant Design & Tailwind</h3>
                  <p className="text-xs text-slate-400 mt-1">Sleek, responsive design with ready-to-use components.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700/60 shadow-lg text-white">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">TypeScript & Express</h3>
                  <p className="text-xs text-slate-400 mt-1">End-to-end type safety with RESTful Node backend.</p>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/80 border-slate-700/60 shadow-lg text-white">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-amber-600/20 text-amber-400">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Prisma PostgreSQL</h3>
                  <p className="text-xs text-slate-400 mt-1">Robust database relational model for products & orders.</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Test Action */}
          <div className="pt-6 flex justify-center gap-4">
            <Button type="primary" size="large" icon={<ShoppingBag className="w-4 h-4 inline" />}>
              Explore Showcase Catalog
            </Button>
            <Button size="large" className="bg-slate-800 border-slate-700 text-white hover:text-indigo-400">
              View API Status
            </Button>
          </div>

        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
