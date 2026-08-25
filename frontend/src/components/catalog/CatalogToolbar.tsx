import React from 'react';
import { Select, Input } from 'antd';
import { Search, Grid, List } from 'lucide-react';

interface CatalogToolbarProps {
  totalItems: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const CatalogToolbar: React.FC<CatalogToolbarProps> = ({
  totalItems,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Search Input & Total Items Counter */}
      <div className="flex items-center gap-4 w-full md:w-auto flex-1 max-w-md">
        <Input
          placeholder="Filter products by name..."
          prefix={<Search className="w-4 h-4 text-slate-400 mr-1" />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          allowClear
          className="rounded-xl border-slate-200 py-1.5"
        />
        <span className="text-xs text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
          Showing <strong className="text-slate-800">{totalItems}</strong> products
        </span>
      </div>

      {/* Sorting & Layout Grid Toggle */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Sort By:</span>
          <Select
            value={sortBy}
            onChange={onSortChange}
            className="w-44 font-medium"
            options={[
              { value: 'featured', label: 'Featured' },
              { value: 'price-low-high', label: 'Price: Low to High' },
              { value: 'price-high-low', label: 'Price: High to Low' },
              { value: 'rating', label: 'Highest Rated' },
            ]}
          />
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default CatalogToolbar;
