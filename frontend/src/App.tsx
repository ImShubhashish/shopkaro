import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4f46e5',
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout cartCount={2} wishlistCount={1} />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<div className="p-8 text-center text-slate-600 font-medium">Products Catalog Page (Coming Soon)</div>} />
            <Route path="orders" element={<div className="p-8 text-center text-slate-600 font-medium">Orders Page (Coming Soon)</div>} />
            <Route path="wishlist" element={<div className="p-8 text-center text-slate-600 font-medium">Wishlist Page (Coming Soon)</div>} />
            <Route path="*" element={<div className="p-12 text-center text-slate-600 font-semibold text-lg">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
