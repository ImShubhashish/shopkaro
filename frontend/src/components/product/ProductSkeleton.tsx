import React from 'react';
import { Card, Skeleton } from 'antd';

interface ProductSkeletonProps {
  count?: number;
}

export const ProductSkeletonCard: React.FC = () => {
  return (
    <Card
      className="group rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between bg-white"
      bodyStyle={{ padding: '16px' }}
    >
      {/* Product Image Aspect Ratio Box */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-3 flex items-center justify-center">
        <Skeleton.Button active block className="!h-full !w-full !rounded-xl" />
      </div>

      {/* Product Details Content Skeleton */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <Skeleton.Button active className="!h-3 !w-16 !rounded-md mb-1.5" />

          {/* Title Lines */}
          <div className="space-y-1.5 mt-1">
            <Skeleton.Button active className="!h-4 !w-11/12 !rounded-md" />
            <Skeleton.Button active className="!h-4 !w-3/4 !rounded-md" />
          </div>
        </div>

        <div className="pt-2 space-y-3">
          {/* Rating Skeleton */}
          <div className="flex items-center gap-1.5">
            <Skeleton.Button active className="!h-3.5 !w-24 !rounded-md" />
          </div>

          {/* Pricing Row & Add Button */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <Skeleton.Button active className="!h-5 !w-20 !rounded-md" />
              <Skeleton.Button active className="!h-3 !w-12 !rounded-md" />
            </div>

            <Skeleton.Button active className="!h-9 !w-18 !rounded-xl" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count }) => {
  if (!count) {
    return <ProductSkeletonCard />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
