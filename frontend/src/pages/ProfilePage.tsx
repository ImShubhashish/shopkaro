import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Avatar, Button, Descriptions, Tag, Spin } from 'antd';
import { Home, User as UserIcon, Mail, Phone, MapPin, Shield, Edit, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import type { User } from '../types';

interface ProfilePageProps {
  user?: User | null;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user: initialUser }) => {
  const [profileUser, setProfileUser] = useState<User | null>(initialUser || null);
  const [loading, setLoading] = useState<boolean>(!initialUser);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfileUser(res.data.data.user);
      } catch {
        setProfileUser({
          id: 'user-demo',
          name: 'Shubhashish Bhattacharya',
          email: 'shubh@shopkaro.com',
          phone: '+91 9876543210',
          role: 'USER' as const,
        });
      } finally {
        setLoading(false);
      }
    };

    if (!initialUser) {
      fetchProfile();
    }
  }, [initialUser]);

  if (loading) {
    return <div className="py-20 text-center"><Spin size="large" /></div>;
  }

  const currentUser = profileUser || {
    id: 'user-demo',
    name: 'Shubhashish Bhattacharya',
    email: 'shubh@shopkaro.com',
    phone: '+91 9876543210',
    role: 'USER' as const,
  };


  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { title: <span className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</span>, href: '/' },
          { title: 'My Account Profile' },
        ]}
      />

      {/* User Header Profile Card */}
      <Card className="rounded-3xl border-slate-200 shadow-sm p-2 bg-gradient-to-r from-indigo-900 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4">
          <div className="flex items-center gap-4">
            <Avatar size={72} className="bg-indigo-600 text-white font-bold text-2xl border-2 border-indigo-400">
              {currentUser.name[0]}
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">{currentUser.name}</h1>
                <Tag color="indigo" className="bg-indigo-500/30 text-indigo-200 border-indigo-400/40 font-semibold text-xs">
                  {currentUser.role}
                </Tag>
              </div>
              <p className="text-slate-300 text-sm mt-0.5">{currentUser.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button icon={<Edit className="w-4 h-4" />} className="bg-white/10 text-white border-white/20 hover:bg-white/20 rounded-xl">
              Edit Profile
            </Button>
            <Link to="/orders">
              <Button type="primary" icon={<Package className="w-4 h-4" />} className="bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold">
                My Orders
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Account Details Section */}
      <Card className="rounded-3xl border-slate-200 shadow-xs p-2">
        <h3 className="font-extrabold text-slate-900 text-lg mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-indigo-600" />
          <span>Account Information</span>
        </h3>

        <Descriptions column={{ xs: 1, sm: 2 }} size="large">
          <Descriptions.Item label={<span className="font-semibold text-slate-600 flex items-center gap-1.5"><UserIcon className="w-4 h-4 text-slate-400" /> Full Name</span>}>
            <span className="font-bold text-slate-900">{currentUser.name}</span>
          </Descriptions.Item>

          <Descriptions.Item label={<span className="font-semibold text-slate-600 flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> Email Address</span>}>
            <span className="font-bold text-slate-900">{currentUser.email}</span>
          </Descriptions.Item>

          <Descriptions.Item label={<span className="font-semibold text-slate-600 flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> Phone Number</span>}>
            <span className="font-bold text-slate-900">{currentUser.phone || '+91 9876543210'}</span>
          </Descriptions.Item>

          <Descriptions.Item label={<span className="font-semibold text-slate-600 flex items-center gap-1.5"><Shield className="w-4 h-4 text-slate-400" /> Account Role</span>}>
            <span className="font-bold text-slate-900">{currentUser.role}</span>
          </Descriptions.Item>


          <Descriptions.Item label={<span className="font-semibold text-slate-600 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> Saved Address</span>}>
            <span className="font-medium text-slate-800">Bengaluru, Karnataka, India (560001)</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProfilePage;
