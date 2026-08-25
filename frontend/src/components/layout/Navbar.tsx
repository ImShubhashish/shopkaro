import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Input, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  Heart, 
  User as UserIcon, 
  Menu as MenuIcon, 
  X,
  LogOut,
  Package,
  Settings
} from 'lucide-react';
import type { User } from '../../types';


interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  user?: User | null;
  onOpenAuthModal?: () => void;
  onOpenCartDrawer?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  user = null,
  onOpenAuthModal,
  onOpenCartDrawer,
  onLogout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserIcon className="w-4 h-4" />,
      label: <Link to="/profile">My Profile</Link>,
    },
    {
      key: 'orders',
      icon: <Package className="w-4 h-4" />,
      label: <Link to="/orders">My Orders</Link>,
    },
    ...(user?.role === 'ADMIN'
      ? [
          {
            key: 'admin',
            icon: <Settings className="w-4 h-4" />,
            label: <Link to="/admin">Admin Dashboard</Link>,
          },
        ]
      : []),
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut className="w-4 h-4 text-red-500" />,
      label: <span className="text-red-500" onClick={onLogout}>Logout</span>,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 hover:text-indigo-700 transition-colors shrink-0">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="tracking-tight text-slate-900 font-extrabold text-2xl">
              Shop<span className="text-indigo-600">Karo</span>
            </span>
          </Link>

          {/* Search Input Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <Input
              placeholder="Search products, brands, categories..."
              prefix={<Search className="w-4 h-4 text-slate-400 mr-1" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={() => handleSearch(searchQuery)}
              className="rounded-full bg-slate-100/80 border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-1.5"
              allowClear
            />
          </div>

          {/* Desktop Navigation Links & Actions */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 font-medium text-sm text-slate-600">
              <Link to="/products" className="hover:text-indigo-600 transition-colors">Categories</Link>
              <Link to="/products?featured=true" className="hover:text-indigo-600 transition-colors">Deals</Link>
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              {/* Wishlist Button */}
              <Link to="/wishlist">
                <Button 
                  type="text" 
                  shape="circle" 
                  className="flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                  icon={
                    <Badge count={wishlistCount} size="small" offset={[2, -2]}>
                      <Heart className="w-5 h-5" />
                    </Badge>
                  }
                />
              </Link>

              {/* Cart Drawer Trigger */}
              <Button 
                type="text" 
                shape="circle" 
                onClick={onOpenCartDrawer}
                className="flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                icon={
                  <Badge count={cartCount} size="small" offset={[2, -2]} color="#4f46e5">
                    <ShoppingCart className="w-5 h-5" />
                  </Badge>
                }
              />

              {/* User Account / Auth Trigger */}
              {user ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                  <Button type="default" shape="round" className="flex items-center gap-2 border-slate-300 font-medium">
                    <UserIcon className="w-4 h-4 text-indigo-600" />
                    <span>{user.name.split(' ')[0]}</span>
                  </Button>
                </Dropdown>
              ) : (
                <Button 
                  type="primary" 
                  shape="round" 
                  onClick={onOpenAuthModal} 
                  className="bg-indigo-600 hover:bg-indigo-700 shadow-xs px-5"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button 
              type="text" 
              shape="circle" 
              onClick={onOpenCartDrawer}
              icon={
                <Badge count={cartCount} size="small">
                  <ShoppingCart className="w-5 h-5 text-slate-700" />
                </Badge>
              }
            />
            <Button 
              type="text" 
              shape="circle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              icon={mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            />
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg">
          <Input
            placeholder="Search products..."
            prefix={<Search className="w-4 h-4 text-slate-400 mr-1" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={() => {
              handleSearch(searchQuery);
              setMobileMenuOpen(false);
            }}
            className="rounded-full bg-slate-100 border-slate-200"
          />

          <nav className="flex flex-col space-y-3 font-medium text-slate-700 pt-2">
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">All Products</Link>
            <Link to="/products?featured=true" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">Deals & Offers</Link>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 hover:text-rose-600">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <div className="text-sm font-semibold text-slate-800">Signed in as {user.name}</div>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-sm text-slate-600">My Profile</Link>
                <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="text-sm text-slate-600">My Orders</Link>
                <Button danger type="dashed" onClick={onLogout} className="mt-2 w-full">Logout</Button>
              </>
            ) : (
              <Button type="primary" block onClick={() => { onOpenAuthModal?.(); setMobileMenuOpen(false); }}>
                Sign In / Register
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
