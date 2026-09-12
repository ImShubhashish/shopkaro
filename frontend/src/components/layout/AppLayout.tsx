import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from '../auth/AuthModal';
import CartDrawer from '../cart/CartDrawer';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import type { User } from '../../types';

interface AppLayoutProps {
  user?: User | null;
  onLogout?: () => void;
  onLoginSuccess?: (user: { name: string; email: string; token: string }) => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  user = null,
  onLogout,
  onLoginSuccess,
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar
        cartCount={totalItems}
        wishlistCount={wishlistCount}
        user={user}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenCartDrawer={() => setCartDrawerOpen(true)}
        onLogout={onLogout}
      />


      {/* Main Page View Outlet */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(userData) => {
          onLoginSuccess?.(userData);
          setAuthModalOpen(false);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </div>
  );
};



export default AppLayout;
