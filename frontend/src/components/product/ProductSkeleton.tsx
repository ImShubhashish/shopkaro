import React from 'react';
import { Card, Skeleton } from 'antd';

interface ProductSkeletonProps {
  count?: number;
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="rounded-2xl border-slate-200 shadow-xs p-2">
          <Skeleton.Button active block className="!h-48 !rounded-xl mb-4" />
          <Skeleton active paragraph={{ rows: 2 }} title={{ width: '60%' }} />
        </Card>
      ))}
    </div>
  );
};

export default ProductSkeleton;
