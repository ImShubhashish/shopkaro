import React from 'react';
import { Radio, Slider, Checkbox, Button, Rate, Tag } from 'antd';
import { Filter, RefreshCw } from 'lucide-react';

interface CategoryFilterProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  inStockOnly: boolean;
  onStockChange: (inStock: boolean) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  inStockOnly,
  onStockChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span>Filters</span>
        </div>
        <Button
          type="text"
          size="small"
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 p-0"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </Button>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-800 text-sm">Categories</h4>
        <Radio.Group
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="flex flex-col gap-2.5 w-full"
        >
          <Radio value="all" className="text-sm font-medium text-slate-700">
            All Categories
          </Radio>
          {categories.map((cat) => (
            <Radio key={cat.id} value={cat.id} className="text-sm text-slate-600">
              {cat.name}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-slate-800 text-sm">Price Range</h4>
          <Tag color="indigo" className="font-bold">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </Tag>
        </div>
        <Slider
          range
          min={0}
          max={50000}
          step={1000}
          value={priceRange}
          onChange={(val) => onPriceChange(val as [number, number])}
        />
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h4 className="font-semibold text-slate-800 text-sm">Minimum Rating</h4>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => onRatingChange(minRating === stars ? 0 : stars)}
              className={`flex items-center gap-2 p-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                minRating === stars ? 'bg-indigo-50 font-bold text-indigo-700' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Rate disabled defaultValue={stars} className="!text-xs text-amber-400" />
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stock Availability Toggle */}
      <div className="pt-3 border-t border-slate-100">
        <Checkbox
          checked={inStockOnly}
          onChange={(e) => onStockChange(e.target.checked)}
          className="text-sm font-medium text-slate-700"
        >
          In Stock Only
        </Checkbox>
      </div>

    </div>
  );
};

export default FilterSidebar;
