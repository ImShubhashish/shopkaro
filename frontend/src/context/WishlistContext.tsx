import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import api from '../api/client';

interface WishlistContextType {
  wishlistCount: number;
  wishlistItems: string[];
  fetchWishlistCount: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isProductWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('shopkaro_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    localStorage.setItem('shopkaro_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const fetchWishlistCount = async () => {
    try {
      const res = await api.get('/wishlist');
      const products = res.data.data.products || [];
      const ids = products.map((p: any) => p.id);
      setWishlistItems(ids);
    } catch {
      // Keep local state if backend call fails or user unauthenticated
    }
  };

  useEffect(() => {
    fetchWishlistCount();
  }, []);

  const toggleWishlist = async (productId: string) => {
    const exists = wishlistItems.includes(productId);
    const updated = exists
      ? wishlistItems.filter((id) => id !== productId)
      : [...wishlistItems, productId];

    // Phase 1: Instant Optimistic UI update
    setWishlistItems(updated);

    try {
      // Fire background POST request
      await api.post('/wishlist/toggle', { productId });
    } catch (error) {
      // Error handling: Revert heart icon state and display toast message
      setWishlistItems(wishlistItems);
      message.error('Failed to save item, please try again');
    }
  };

  const isProductWishlisted = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistCount, wishlistItems, fetchWishlistCount, toggleWishlist, isProductWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
