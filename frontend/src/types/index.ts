export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  rating: number;
  numReviews: number;
  categoryId: string;
  category?: Category;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  address: string;
  city: string;
  postalCode: string;
  country: string;
  items: OrderItem[];
  createdAt: string;
}
