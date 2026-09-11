import React, { useState } from 'react';
import { Modal, Form, Input, Button, Tabs, Select, message } from 'antd';
import { Mail, Lock, User as UserIcon, ShoppingBag, ArrowRight, Phone } from 'lucide-react';
import api from '../../api/client';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  onLoginSuccess?: (user: { name: string; email: string; token: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  initialTab = 'login',
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();


  const handleLoginSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      const { user, token } = res.data.data;
      localStorage.setItem('shopkaro_token', token);
      message.success(`Welcome back, ${user.name}!`);
      onLoginSuccess?.({ name: user.name, email: user.email, token });
      loginForm.resetFields();
      onClose();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please check credentials.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      const { user, token } = res.data.data;
      localStorage.setItem('shopkaro_token', token);
      message.success('Account created successfully! Welcome to ShopKaro.');
      onLoginSuccess?.({ name: user.name, email: user.email, token });
      registerForm.resetFields();
      onClose();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to register account.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={460}
      centered
      className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
    >
      <div className="pt-4 pb-2 px-2 space-y-6">
        
        {/* Header Logo & Welcome text */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {activeTab === 'login' ? 'Welcome back to ShopKaro' : 'Create your Account'}
          </h2>
          <p className="text-sm text-slate-500">
            {activeTab === 'login'
              ? 'Enter your credentials to access your account'
              : 'Join thousands of shoppers enjoying exclusive festive deals'}
          </p>
        </div>

        {/* Auth Mode Tabs Switcher */}
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as 'login' | 'register')}
          centered
          items={[
            { key: 'login', label: <span className="text-base font-semibold px-4">Login</span> },
            { key: 'register', label: <span className="text-base font-semibold px-4">Sign Up</span> },
          ]}
        />

        {/* Login Form View */}
        {activeTab === 'login' && (
          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLoginSubmit}
            requiredMark={false}
            size="large"
            className="space-y-4 pt-2"
          >
            <Form.Item
              name="email"
              label={<span className="font-medium text-slate-700 text-sm">Email Address</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input
                prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />}
                placeholder="name@example.com"
                className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-2.5"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium text-slate-700 text-sm">Password</span>
                  <a href="#forgot" className="text-xs font-semibold text-indigo-600 hover:underline">
                    Forgot?
                  </a>
                </div>
              }
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-slate-400 mr-2" />}
                placeholder="••••••••"
                className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-2.5"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-base shadow-md shadow-indigo-200 mt-2 flex items-center justify-center gap-2"
            >
              <span>Login to Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Form>
        )}

        {/* Register Form View */}
        {activeTab === 'register' && (
          <Form
            form={registerForm}
            layout="vertical"
            onFinish={handleRegisterSubmit}
            requiredMark={false}
            size="large"
            className="space-y-4 pt-2"
          >
            <Form.Item
              name="name"
              label={<span className="font-medium text-slate-700 text-sm">Full Name</span>}
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input
                prefix={<UserIcon className="w-4 h-4 text-slate-400 mr-2" />}
                placeholder="Shubhashish Bhattacharya"
                className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-2.5"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={<span className="font-medium text-slate-700 text-sm">Email Address</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<Mail className="w-4 h-4 text-slate-400 mr-2" />}
                placeholder="name@example.com"
                className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-2.5"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<span className="font-medium text-slate-700 text-sm">Phone Number</span>}
              rules={[
                { required: true, message: 'Please enter your phone number' },
                { pattern: /^\d{7,14}$/, message: 'Please enter a valid phone number' },
              ]}
            >
              <Input
                addonBefore={
                  <Form.Item name="countryCode" noStyle initialValue="+91">
                    <Select className="w-24 font-medium">
                      <Select.Option value="+91">🇮🇳 +91</Select.Option>
                      <Select.Option value="+1">🇺🇸 +1</Select.Option>
                      <Select.Option value="+44">🇬🇧 +44</Select.Option>
                      <Select.Option value="+971">🇦🇪 +971</Select.Option>
                      <Select.Option value="+61">🇦🇺 +61</Select.Option>
                      <Select.Option value="+65">🇸🇬 +65</Select.Option>
                      <Select.Option value="+49">🇩🇪 +49</Select.Option>
                      <Select.Option value="+81">🇯🇵 +81</Select.Option>
                    </Select>
                  </Form.Item>
                }
                prefix={<Phone className="w-4 h-4 text-slate-400 mr-1" />}
                placeholder="9876543210"
                className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-1"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="font-medium text-slate-700 text-sm">Create Password</span>}
              rules={[
                { required: true, message: 'Please create a password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password
                prefix={<Lock className="w-4 h-4 text-slate-400 mr-2" />}
                placeholder="Min 6 characters"
                className="rounded-xl border-slate-200 hover:border-indigo-400 focus:border-indigo-500 py-2.5"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-base shadow-md shadow-indigo-200 mt-2 flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Form>
        )}

      </div>
    </Modal>
  );
};

export default AuthModal;
