import React from 'react';
import { Breadcrumb, Card, Tag, Table, Button } from 'antd';
import { Home, Package, Truck, CheckCircle2, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrdersPage: React.FC = () => {
  const mockOrders = [
    {
      id: 'SK-89421',
      date: '25 Aug 2026',
      totalAmount: 26990,
      status: 'DELIVERED',
      itemsCount: 1,
      itemsSummary: 'Sony WH-1000XM5 Wireless Headphones',
    },
    {
      id: 'SK-75319',
      date: '18 Aug 2026',
      totalAmount: 11495,
      status: 'SHIPPED',
      itemsCount: 1,
      itemsSummary: 'Nike Air Max 270 React Running Shoes',
    },
    {
      id: 'SK-61204',
      date: '02 Aug 2026',
      totalAmount: 34990,
      status: 'PROCESSING',
      itemsCount: 1,
      itemsSummary: 'DeLonghi Specialista Espresso Machine',
    },
  ];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-bold text-indigo-600">{text}</span>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      className: 'text-slate-600 font-medium',
    },
    {
      title: 'Items',
      dataIndex: 'itemsSummary',
      key: 'itemsSummary',
      render: (text: string, record: any) => (
        <div>
          <span className="font-semibold text-slate-800 block">{text}</span>
          <span className="text-xs text-slate-400">{record.itemsCount} Item(s)</span>
        </div>
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <span className="font-extrabold text-slate-900">₹{amount.toLocaleString('en-IN')}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'DELIVERED') {
          return (
            <Tag color="green" icon={<CheckCircle2 className="w-3 h-3 inline mr-1" />} className="font-bold px-2.5 py-0.5 rounded-md">
              DELIVERED
            </Tag>
          );
        }
        if (status === 'SHIPPED') {
          return (
            <Tag color="blue" icon={<Truck className="w-3 h-3 inline mr-1" />} className="font-bold px-2.5 py-0.5 rounded-md">
              SHIPPED
            </Tag>
          );
        }
        return (
          <Tag color="orange" icon={<Clock className="w-3 h-3 inline mr-1" />} className="font-bold px-2.5 py-0.5 rounded-md">
            PROCESSING
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="default" size="small" icon={<Eye className="w-3.5 h-3.5" />} className="rounded-lg">
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { title: <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</span>, href: '/' },
          { title: 'My Orders' },
        ]}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-7 h-7 text-indigo-600" />
            <span>My Order History</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Track and manage your past ShopKaro orders</p>
        </div>
        <Link to="/products">
          <Button type="primary" className="bg-indigo-600 rounded-xl font-bold">
            Shop More
          </Button>
        </Link>
      </div>

      {/* Orders Table Container */}
      <Card className="rounded-3xl border-slate-200 shadow-xs overflow-hidden">
        <Table columns={columns} dataSource={mockOrders} rowKey="id" pagination={false} size="middle" />
      </Card>
    </div>
  );
};

export default OrdersPage;
