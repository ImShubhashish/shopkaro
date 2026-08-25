import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    description: 'Industry-leading noise canceling with two processors and eight microphones for unprecedented sound clarity.',
    price: 26990,
    stock: 12,
    rating: 4.8,
    numReviews: 245,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'prod-2',
    name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
    description: 'Advanced health sensors, Double Tap gesture control, and bright Always-On Retina display.',
    price: 41900,
    stock: 8,
    rating: 4.9,
    numReviews: 189,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'prod-3',
    name: 'Nike Air Max 270 React Running Shoes',
    description: 'Bold lifestyle shoe combining React foam cushioning with a large Max Air heel unit.',
    price: 11495,
    stock: 15,
    rating: 4.6,
    numReviews: 98,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'prod-4',
    name: 'DeLonghi Specialista Arte Espresso Coffee Machine',
    description: 'Compact bean-to-cup espresso machine with integrated grinder and manual steam wand.',
    price: 34990,
    stock: 5,
    rating: 4.7,
    numReviews: 76,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    ],
    categoryId: 'home',
    category: { id: 'home', name: 'Home', slug: 'home' },
  },
];
