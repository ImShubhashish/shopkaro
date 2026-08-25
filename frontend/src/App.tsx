import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
import type { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = (userData: { name: string; email: string; token: string }) => {
    setUser({
      id: 'user-1',
      name: userData.name,
      email: userData.email,
      role: 'USER',
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

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
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <AppLayout 
                  user={user} 
                  onLoginSuccess={handleLoginSuccess}
                  onLogout={handleLogout}
                />
              }
            >
              <Route index element={<HomePage />} />
              <Route path="products" element={<CatalogPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="orders" element={<div className="p-8 text-center text-slate-600 font-medium">Orders Page (Coming Soon)</div>} />
              <Route path="wishlist" element={<div className="p-8 text-center text-slate-600 font-medium">Wishlist Page (Coming Soon)</div>} />
              <Route path="*" element={<div className="p-12 text-center text-slate-600 font-semibold text-lg">404 - Page Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ConfigProvider>
  );
};


export default App;

