import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Table, Button, Empty, Spin } from 'antd';
import { Home, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/client';
import type { Product } from '../types';

export const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await api.get('/wishlist');
        setWishlistItems(res.data.data.products || []);
      } catch {
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await api.delete(`/wishlist/${id}`);
    } catch {
      // Ignored
    }
  };

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    handleRemoveFromWishlist(product.id);
  };



  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <div className="flex items-center gap-3.5">
          <img src={record.images[0]} alt={text} className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100" />
          <div className="min-w-0">
            <Link to={`/products/${record.id}`} className="font-bold text-slate-800 text-sm hover:text-indigo-600 truncate block">
              {text}
            </Link>
            <span className="text-xs text-indigo-600 font-semibold uppercase">{record.categoryId}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span className="font-extrabold text-slate-900 text-base">₹{price.toLocaleString('en-IN')}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            size="middle"
            onClick={() => handleMoveToCart(record)}
            className="bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Move to Cart</span>
          </Button>
          <Button
            danger
            type="text"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => handleRemoveFromWishlist(record.id)}
            className="rounded-xl"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { title: <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</span>, href: '/' },
          { title: 'My Saved Wishlist' },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlistItems.length})</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Saved items you want to buy later</p>
        </div>
      </div>

      {/* Wishlist Table or Empty State */}
      {loading ? (
        <div className="py-20 text-center"><Spin size="large" /></div>
      ) : wishlistItems.length > 0 ? (
        <Card className="rounded-3xl border-slate-200 shadow-xs overflow-hidden">
          <Table columns={columns} dataSource={wishlistItems} rowKey="id" pagination={false} size="middle" />
        </Card>
      ) : (
        <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center space-y-4 shadow-xs">
          <Empty description="Your Wishlist is currently empty" />
          <Link to="/products">
            <Button type="primary" size="large" className="bg-indigo-600 rounded-2xl font-bold h-11">
              Explore Products
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
};

export default WishlistPage;
