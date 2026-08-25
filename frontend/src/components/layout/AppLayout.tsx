import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import type { User } from '../../types';

interface AppLayoutProps {
  cartCount?: number;
  wishlistCount?: number;
  user?: User | null;
  onLogout?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  user = null,
  onLogout,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        user={user}
        onOpenAuthModal={() => {}}
        onOpenCartDrawer={() => {}}
        onLogout={onLogout}
      />


      {/* Main Page View Outlet */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
