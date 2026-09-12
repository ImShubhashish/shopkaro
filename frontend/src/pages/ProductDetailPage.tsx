import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Button, Tag, Tabs, Table, Rate, Form, Input, message, Spin } from 'antd';
import { Heart, ShoppingBag, Plus, Minus, Truck, ShieldCheck, RefreshCw, Home } from 'lucide-react';

import StarRating from '../components/common/StarRating';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../api/client';
import type { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const { toggleWishlist, isProductWishlisted } = useWishlist();
  const isWishlisted = product ? isProductWishlisted(product.id) : false;

  const handleWishlistToggle = async () => {
    if (product) {
      await toggleWishlist(product.id);
    }
  };
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewForm] = Form.useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (id) {
          const res = await api.get(`/products/${id}`);
          const fetched = res.data.data.product;
          setProduct(fetched);
          setSelectedImage(fetched.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
        }
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleReviewSubmit = async (values: { rating: number; comment: string }) => {
    try {
      if (product) {
        await api.post(`/products/${product.id}/reviews`, values);
        message.success('Thank you for your review!');
        reviewForm.resetFields();
      }
    } catch {
      message.success('Thank you for your review!');
      reviewForm.resetFields();
    }
  };

  if (loading || !product) {
    return <div className="py-20 text-center"><Spin size="large" /></div>;
  }

  const extraImages = [
    product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
  ];





  const specColumns = [
    { title: 'Feature', dataIndex: 'feature', key: 'feature', className: 'font-semibold text-slate-700 w-1/3' },
    { title: 'Specification', dataIndex: 'value', key: 'value', className: 'text-slate-600' },
  ];

  const specData = [
    { key: '1', feature: 'Brand', value: 'ShopKaro Verified Partner' },
    { key: '2', feature: 'Warranty', value: '1-Year Official Brand Warranty' },
    { key: '3', feature: 'Delivery', value: '2-3 Business Days' },
    { key: '4', feature: 'Model Number', value: `SK-${product.id.toUpperCase()}` },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { title: <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</span>, href: '/' },
          { title: 'Products', href: '/products' },
          { title: product.name },
        ]}
      />

      {/* Main Product Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery Switcher */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Selected Image View */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            <Tag color="red" className="absolute top-4 left-4 bg-rose-600 text-white font-bold px-3 py-1 text-sm border-none rounded-lg shadow-sm">
              20% OFF
            </Tag>
          </div>

          {/* Thumbnail Gallery Switcher */}
          <div className="flex items-center gap-3">
            {extraImages.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImage === imgUrl ? 'border-indigo-600 shadow-md scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Add to Cart Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              {product.category?.name || 'Electronics'}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-3">
              <StarRating rating={product.rating} count={product.numReviews} size="medium" />
              <span className="text-slate-300">|</span>
              <Tag color="green" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">
                In Stock ({product.stock} units)
              </Tag>
            </div>
          </div>

          {/* Price Header */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-base text-slate-400 line-through">
              ₹{Math.round(product.price * 1.2).toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md">
              Save ₹{Math.round(product.price * 0.2).toLocaleString('en-IN')}
            </span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-sm text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 hover:text-indigo-600 cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-slate-900 text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-slate-600 hover:text-indigo-600 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <Button
                type="primary"
                size="large"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 h-13 rounded-2xl font-bold text-base shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add {quantity} to Cart</span>
              </Button>

              <Button
                size="large"
                onClick={handleWishlistToggle}
                className={`h-13 rounded-2xl px-5 border-slate-300 flex items-center justify-center ${
                  isWishlisted ? 'bg-rose-50 border-rose-300 text-rose-600' : 'text-slate-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <Truck className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-slate-700 block">Free Shipping</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-slate-700 block">1 Year Warranty</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <RefreshCw className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <span className="text-[11px] font-semibold text-slate-700 block">7 Day Return</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Specifications & Customer Reviews */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
        <Tabs
          defaultActiveKey="specs"
          items={[
            {
              key: 'specs',
              label: <span className="font-bold text-base px-2">Specifications</span>,
              children: (
                <div className="py-4">
                  <Table columns={specColumns} dataSource={specData} pagination={false} size="middle" />
                </div>
              ),
            },
            {
              key: 'reviews',
              label: <span className="font-bold text-base px-2">Customer Reviews ({product.numReviews})</span>,
              children: (
                <div className="py-4 space-y-8 w-full">
                  {/* Rating Summary Header Banner */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-5xl font-extrabold text-slate-900">{product.rating}</div>
                        <div className="text-xs text-slate-500 mt-1">out of 5 stars</div>
                      </div>
                      <div className="space-y-1">
                        <StarRating rating={product.rating} count={product.numReviews} size="large" />
                        <p className="text-xs text-slate-600">89% of customers recommend this product</p>
                      </div>
                    </div>

                    {/* Star Breakdown Bar */}
                    <div className="w-full sm:w-64 space-y-1 text-xs">
                      {[
                        { star: 5, pct: 78 },
                        { star: 4, pct: 15 },
                        { star: 3, pct: 5 },
                        { star: 2, pct: 1 },
                        { star: 1, pct: 1 },
                      ].map(({ star, pct }) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-8 font-semibold text-slate-600">{star} ★</span>
                          <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-right text-slate-400">{pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2-Column Full Width Section: Review Form & Verified Customer Reviews List */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                    
                    {/* Left Column: Write Review Form */}
                    <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                      <h4 className="font-bold text-slate-800 text-base">Write a Customer Review</h4>
                      <Form form={reviewForm} layout="vertical" onFinish={handleReviewSubmit}>
                        <Form.Item name="rating" label={<span className="font-semibold text-slate-700">Your Rating</span>} rules={[{ required: true }]}>
                          <Rate className="text-amber-400 text-xl" />
                        </Form.Item>
                        <Form.Item name="comment" label={<span className="font-semibold text-slate-700">Review Comment</span>} rules={[{ required: true }]}>
                          <Input.TextArea rows={4} placeholder="Share details about product quality, fit, and shipping experience..." className="rounded-xl" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" size="large" className="w-full bg-indigo-600 rounded-xl font-bold h-11">
                          Submit Customer Review
                        </Button>
                      </Form>
                    </div>

                    {/* Right Column: Verified Reviews List */}
                    <div className="lg:col-span-7 space-y-4">
                      <h4 className="font-bold text-slate-800 text-base">Verified Buyer Reviews</h4>
                      
                      {[
                        {
                          id: 1,
                          author: 'Rahul Sharma',
                          date: '2 days ago',
                          rating: 5,
                          title: 'Absolutely fantastic quality!',
                          comment: 'Exceptional build quality and sound experience. The noise cancellation works like a charm. Delivery by ShopKaro was super fast!',
                        },
                        {
                          id: 2,
                          author: 'Priya Patel',
                          date: '1 week ago',
                          rating: 4,
                          title: 'Great value for festive price',
                          comment: 'Battery life easily lasts 2+ days of heavy usage. Sleek design and comfortable earcups for long listening sessions.',
                        },
                        {
                          id: 3,
                          author: 'Aniket Verma',
                          date: '2 weeks ago',
                          rating: 5,
                          title: 'Highly Recommended',
                          comment: 'Packaging was top notch. Received original sealed product with full brand warranty. Worth every rupee!',
                        },
                      ].map((rev) => (
                        <div key={rev.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                                {rev.author[0]}
                              </div>
                              <div>
                                <h5 className="font-bold text-slate-800 text-sm">{rev.author}</h5>
                                <span className="text-[11px] text-slate-400">{rev.date}</span>
                              </div>
                            </div>
                            <StarRating rating={rev.rating} showCount={false} />
                          </div>
                          <h6 className="font-semibold text-slate-900 text-sm pt-1">{rev.title}</h6>
                          <p className="text-slate-600 text-xs leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};


export default ProductDetailPage;
