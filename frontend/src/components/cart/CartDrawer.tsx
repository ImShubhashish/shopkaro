import React from 'react';
import { Drawer, Button, Progress, Empty } from 'antd';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems, freeShippingThreshold } = useCart();
  const navigate = useNavigate();

  const progressPercent = Math.min(Math.round((subtotal / freeShippingThreshold) * 100), 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  const handleCheckoutClick = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <span>Your Shopping Cart ({totalItems})</span>
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      className="rounded-l-3xl overflow-hidden"
    >
      <div className="flex flex-col h-full justify-between">
        
        {/* Free Shipping Progress Indicator */}
        <div className="bg-indigo-50/80 p-3.5 rounded-2xl border border-indigo-100 mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-900">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-indigo-600" />
              {remainingForFreeShipping <= 0 ? (
                <span className="text-emerald-600 font-bold">🎉 You qualify for FREE Express Shipping!</span>
              ) : (
                <span>Add ₹{remainingForFreeShipping.toLocaleString('en-IN')} more for FREE Shipping</span>
              )}
            </span>
          </div>
          <Progress percent={progressPercent} showInfo={false} strokeColor="#4f46e5" />
        </div>

        {/* Cart Item Rows */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {cart.length > 0 ? (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-colors"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Info & Quantity Counter */}
                <div className="flex-1 space-y-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-xs truncate">{product.name}</h4>
                  <div className="text-sm font-bold text-slate-900">
                    ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </div>

                  {/* Quantity Counter Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 text-slate-600 hover:text-indigo-600 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 text-slate-600 hover:text-indigo-600 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <Empty description="Your shopping cart is empty" />
              <Button type="primary" onClick={onClose} className="bg-indigo-600 rounded-xl">
                Explore Products
              </Button>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-slate-200 space-y-3 mt-4">
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900 text-base">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleCheckoutClick}
              className="bg-indigo-600 hover:bg-indigo-500 h-12 rounded-2xl font-bold text-base shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </div>
    </Drawer>
  );
};

export default CartDrawer;
