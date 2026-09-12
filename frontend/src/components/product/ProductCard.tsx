import React from 'react';
import { Card, Tag, Button, Tooltip } from 'antd';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarRating from '../common/StarRating';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  discountPercentage?: number;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  discountPercentage = 15,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isProductWishlisted } = useWishlist();

  const activeInWishlist = isWishlisted !== undefined ? isWishlisted : isProductWishlisted(product.id);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleWishlist(product.id);
    onToggleWishlist?.(product);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    onAddToCart?.(product);
  };


  const originalPrice = Math.round(product.price * (1 + discountPercentage / 100));

  return (
    <Card
      hoverable
      className="group rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white"
      bodyStyle={{ padding: '16px' }}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Top Badges (Discount & Stock Status) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercentage > 0 && (
            <Tag color="red" className="bg-rose-600 text-white font-bold border-none px-2 py-0.5 rounded-md text-xs shadow-xs">
              {discountPercentage}% OFF
            </Tag>
          )}
          {product.stock <= 0 && (
            <Tag color="default" className="bg-slate-900/80 text-white font-semibold border-none px-2 py-0.5 rounded-md text-[11px] backdrop-blur-md">
              Out of Stock
            </Tag>
          )}
        </div>

        {/* Floating Action Buttons (Wishlist Heart & Quick View) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 z-10">
          <Tooltip title={activeInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
            <button
              onClick={handleWishlistClick}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                activeInWishlist
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${activeInWishlist ? 'fill-white' : ''}`} />
            </button>
          </Tooltip>
        </div>

        {/* Quick Details Overlay Link */}
        <Link to={`/products/${product.id}`} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/90 text-slate-900 font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-indigo-600" /> Quick View
            </span>
          </div>
        </Link>
      </div>

      {/* Product Details Content */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
            {product.category?.name || 'General'}
          </span>

          {/* Product Title */}
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 hover:text-indigo-600 transition-colors mt-0.5">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="pt-1 space-y-3">
          {/* Star Rating */}
          <StarRating rating={product.rating} count={product.numReviews} />

          {/* Pricing Row & Add to Cart Button */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <div>
              <div className="text-lg font-bold text-slate-900 leading-none">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              {discountPercentage > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <Button
              type="primary"
              disabled={product.stock <= 0}
              onClick={handleCartClick}
              className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-3.5 h-9 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
