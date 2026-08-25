import React from 'react';
import { 
  Shirt, 
  Smartphone, 
  Laptop, 
  Sparkles, 
  Home as HomeIcon, 
  Tv, 
  Smile, 
  HeartPulse, 
  Bike, 
  Armchair, 
  BookOpen 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CategoryBarProps {
  onSelectCategory?: (id: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const categories: CategoryItem[] = [
    { id: 'fashion', name: 'Fashion', icon: <Shirt className="w-5 h-5" /> },
    { id: 'mobiles', name: 'Mobiles', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'electronics', name: 'Electronics', icon: <Laptop className="w-5 h-5" /> },
    { id: 'beauty', name: 'Beauty', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'home', name: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { id: 'appliances', name: 'Appliances', icon: <Tv className="w-5 h-5" /> },
    { id: 'toys', name: 'Toys & Kids', icon: <Smile className="w-5 h-5" /> },
    { id: 'health', name: 'Health & Care', icon: <HeartPulse className="w-5 h-5" /> },
    { id: 'furniture', name: 'Furniture', icon: <Armchair className="w-5 h-5" /> },
    { id: 'books', name: 'Books', icon: <BookOpen className="w-5 h-5" /> },
    { id: '2wheelers', name: '2 Wheelers', icon: <Bike className="w-5 h-5" /> },
  ];

  const handleCategoryClick = (id: string) => {
    onSelectCategory?.(id);
    navigate(`/products?category=${id}`);
  };

  return (
    <div className="w-full bg-white border-b border-slate-200 py-3 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2 items-center justify-between w-full text-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group flex flex-col items-center justify-center gap-1.5 py-1 px-1 rounded-xl hover:bg-indigo-50/60 transition-all cursor-pointer w-full"
            >
              <div className="p-2.5 rounded-xl bg-slate-100/80 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-indigo-200 transition-all">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-600 truncate w-full">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
