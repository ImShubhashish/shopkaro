import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import WishlistPage from './pages/WishlistPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import api from './api/client';
import type { User } from './types';

const SESSION_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes inactivity timeout

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('shopkaro_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = useCallback((expired: boolean = false) => {
    localStorage.removeItem('shopkaro_token');
    localStorage.removeItem('shopkaro_user');
    setUser(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (expired) {
      message.warning('Session expired due to 5 minutes of inactivity. Please log in again.');
    }
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (user) {
      timerRef.current = setTimeout(() => {
        handleLogout(true);
      }, SESSION_TIMEOUT_MS);
    }
  }, [user, handleLogout]);

  // Restore session from API / verify token validity on mount or refresh
  useEffect(() => {
    const token = localStorage.getItem('shopkaro_token');
    if (token) {
      api.get('/auth/me')
        .then((res) => {
          const userData = res.data.data.user;
          setUser(userData);
          localStorage.setItem('shopkaro_user', JSON.stringify(userData));
        })
        .catch(() => {
          handleLogout(false);
        });
    }
  }, [handleLogout]);

  // Listen to user activity events to reset 5-minute inactivity timer
  useEffect(() => {
    if (!user) return;

    resetInactivityTimer();

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    activityEvents.forEach((evt) => window.addEventListener(evt, handleUserActivity));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
    };
  }, [user, resetInactivityTimer]);

  const handleLoginSuccess = (userData: { name: string; email: string; token: string }) => {
    const loggedUser: User = {
      id: 'user-1',
      name: userData.name,
      email: userData.email,
      role: 'USER',
    };
    localStorage.setItem('shopkaro_token', userData.token);
    localStorage.setItem('shopkaro_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
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
        <WishlistProvider>
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
                <Route path="orders" element={<OrdersPage />} />
                <Route path="profile" element={<ProfilePage user={user} />} />
                <Route path="admin" element={<AdminDashboardPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="*" element={<div className="p-12 text-center text-slate-600 font-semibold text-lg">404 - Page Not Found</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </ConfigProvider>
  );
};





export default App;

