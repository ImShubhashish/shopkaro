import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/home/HeroCarousel';
import ProductCard from '../components/product/ProductCard';
import ProductSkeleton from '../components/product/ProductSkeleton';
import api from '../api/client';
import type { Product } from '../types';

export const HomePage: React.FC = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [under999Products, setUnder999Products] = useState<Product[]>([]);
  const [giftStoreProducts, setGiftStoreProducts] = useState<Product[]>([]);
  const [fashionProducts, setFashionProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/products');
        const allProducts: Product[] = res.data.data.products || [];

        // 1) Flash Sale: High discount / featured items
        setFlashSaleProducts(allProducts.slice(0, 4));

        // 2) Currently Trending Items: High rating items
        const trending = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);
        setTrendingProducts(trending);

        // 3) Under ₹999 Super Deals: Budget priced or lower cost items
        const budget = allProducts.filter((p) => p.price <= 9999).slice(0, 4);
        setUnder999Products(budget.length >= 4 ? budget : allProducts.slice(8, 12));

        // 4) Festive Gift Store: Beauty & electronics curated gifts
        const giftable = allProducts.filter((p) => p.categoryId === 'beauty' || p.categoryId === 'electronics').slice(0, 4);
        setGiftStoreProducts(giftable.length >= 4 ? giftable : allProducts.slice(12, 16));

        // 5) Fashion & Accessories: Fashion category items
        const fashion = allProducts.filter((p) => p.categoryId === 'fashion').slice(0, 4);
        setFashionProducts(fashion.length >= 4 ? fashion : allProducts.slice(16, 20));

        // 6) New Arrivals
        setNewArrivals(allProducts.slice(4, 8));
      } catch (err) {
        console.error('Failed to fetch home products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Offer Carousel */}
      <HeroCarousel />

      {/* 1) Flash Sale: Ending Soon Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Flash Sale: Ending Soon</h2>
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                  ⚡ Limited Time
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">Grab these extra-discounted picks before stocks run out</p>
            </div>
          </div>
          <Link to="/products?featured=true" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
            View All Flash Deals &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                discountPercentage={idx % 2 === 0 ? 30 : 25}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2) Currently Trending Items Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Currently Trending Items</h2>
            <p className="text-sm text-slate-500 mt-0.5">What shoppers are buying and rating highest right now</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
            View All Trending &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                discountPercentage={15}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3) Under ₹999 Super Deals Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Under ₹999 Super Deals</h2>
            <p className="text-sm text-slate-500 mt-0.5">High quality lifestyle & everyday picks that fit any budget</p>
          </div>
          <Link to="/products?maxPrice=9999" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
            View Budget Store &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under999Products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                discountPercentage={20}
              />
            ))}
          </div>
        )}
      </div>

      {/* 4) Festive Gift Store Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Festive Gift Store</h2>
            <p className="text-sm text-slate-500 mt-0.5">Perfect gifts, luxury hampers, and memorable treats for loved ones</p>
          </div>
          <Link to="/products?category=beauty" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
            Explore Gift Ideas &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftStoreProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                discountPercentage={15}
              />
            ))}
          </div>
        )}
      </div>

      {/* 5) Fashion & Accessories Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Fashion & Accessories</h2>
            <p className="text-sm text-slate-500 mt-0.5">Upgrade your wardrobe with luxury apparel, footwear & shades</p>
          </div>
          <Link to="/products?category=fashion" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
            View Fashion Collection &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fashionProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                discountPercentage={18}
              />
            ))}
          </div>
        )}
      </div>

      {/* New Arrivals Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">New Arrivals</h2>
            <p className="text-sm text-slate-500 mt-0.5">Explore the latest additions to our collection</p>
          </div>
          <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
            View All Products &rarr;
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                discountPercentage={10}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
