import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Table, Button, Modal, Form, Input, InputNumber, Select, Tag, Space, message } from 'antd';
import { Home, Settings, Plus, Edit, Trash2, DollarSign, Package, ShoppingBag } from 'lucide-react';
import api from '../api/client';
import type { Product } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data.data.products || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      image: product.images[0],
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      message.success('Product deleted from inventory');
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, {
          name: values.name,
          description: values.description,
          price: values.price,
          stock: values.stock,
          categoryId: values.categoryId,
          images: [values.image || editingProduct.images[0]],
        });
        message.success('Product updated successfully');
      } else {
        await api.post('/products', {
          name: values.name,
          description: values.description,
          price: values.price,
          stock: values.stock,
          categoryId: values.categoryId,
          images: [values.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
        });
        message.success('New product added to inventory');
      }
      fetchProducts();
      setIsModalOpen(false);
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  const totalRevenue = products.reduce((acc, p) => acc + p.price * 15, 0);
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <div className="flex items-center gap-3">
          <img src={record.images[0]} alt={text} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
          <div className="min-w-0 max-w-xs">
            <span className="font-bold text-slate-800 text-sm block truncate">{text}</span>
            <span className="text-xs text-indigo-600 font-semibold uppercase">{record.categoryId}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span className="font-extrabold text-slate-900">₹{price.toLocaleString('en-IN')}</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 5 ? 'green' : 'orange'} className="font-bold">
          {stock} Units
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <span className="font-semibold text-slate-700">★ {rating}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Button size="small" icon={<Edit className="w-3.5 h-3.5" />} onClick={() => handleOpenEditModal(record)} />
          <Button size="small" danger icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => handleDeleteProduct(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { title: <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</span>, href: '/' },
          { title: 'Admin Dashboard' },
        ]}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Settings className="w-7 h-7 text-indigo-600" />
            <span>Admin Control Panel</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage products, stock inventory, and store analytics</p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<Plus className="w-4 h-4 inline" />}
          onClick={handleOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold h-11"
        >
          Add New Product
        </Button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-slate-200 shadow-xs bg-gradient-to-br from-indigo-50 to-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase">Est. Monthly Revenue</span>
              <span className="text-2xl font-black text-slate-900">₹{totalRevenue.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-xs bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase">Total Products</span>
              <span className="text-2xl font-black text-slate-900">{products.length} Items</span>
            </div>
          </div>
        </Card>

        <Card className="rounded-3xl border-slate-200 shadow-xs bg-gradient-to-br from-amber-50 to-white">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-600 text-white shadow-md">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block uppercase">In-Stock Units</span>
              <span className="text-2xl font-black text-slate-900">{totalStock} Units</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Products Management Table */}
      <Card className="rounded-3xl border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between pb-4">
          <h3 className="font-bold text-slate-900 text-base">Product Inventory Catalog</h3>
        </div>
        <Table columns={columns} dataSource={products} rowKey="id" loading={loading} pagination={{ pageSize: 8 }} size="middle" />
      </Card>

      {/* Product Create / Edit Modal */}
      <Modal
        open={isModalOpen}
        title={<span className="font-bold text-lg">{editingProduct ? 'Edit Product' : 'Add New Product'}</span>}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={520}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="pt-3 space-y-3">
          <Form.Item name="name" label="Product Title" rules={[{ required: true }]}>
            <Input className="rounded-xl" placeholder="e.g. Sony WH-1000XM5 Headphones" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={3} className="rounded-xl" placeholder="Product features and specs..." />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="price" label="Price (₹)" rules={[{ required: true }]}>
              <InputNumber className="w-full rounded-xl" min={0} />
            </Form.Item>
            <Form.Item name="stock" label="Stock Quantity" rules={[{ required: true }]}>
              <InputNumber className="w-full rounded-xl" min={0} />
            </Form.Item>
          </div>

          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select className="rounded-xl">
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="fashion">Fashion</Select.Option>
              <Select.Option value="home">Home & Living</Select.Option>
              <Select.Option value="beauty">Beauty</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="image" label="Image URL">
            <Input className="rounded-xl" placeholder="https://images.unsplash.com/..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block className="bg-indigo-600 rounded-xl font-bold h-11">
            {editingProduct ? 'Save Product Changes' : 'Create Product'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboardPage;
