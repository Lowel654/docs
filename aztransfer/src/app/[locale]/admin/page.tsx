'use client';

import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function AdminPanel() {
  const { locale } = useTranslation();

  const stats = [
    { label: 'Total Revenue', value: '12,450 AZN', change: '+12%', color: 'text-green-500' },
    { label: 'Total Bookings', value: '234', change: '+8%', color: 'text-blue-500' },
    { label: 'Active Drivers', value: '18', change: '+2', color: 'text-yellow-500' },
    { label: 'Customers', value: '1,250', change: '+45', color: 'text-purple-500' },
  ];

  const sections = [
    { href: `/${locale}/admin/customers`, icon: '👥', label: 'Customers', count: '1,250' },
    { href: `/${locale}/admin/drivers`, icon: '🚗', label: 'Drivers', count: '18' },
    { href: `/${locale}/admin/vehicles`, icon: '🚙', label: 'Vehicles', count: '42' },
    { href: `/${locale}/admin/bookings`, icon: '📋', label: 'Bookings', count: '234' },
    { href: `/${locale}/admin/promotions`, icon: '🎫', label: 'Promotions', count: '5' },
    { href: `/${locale}/admin/payments`, icon: '💳', label: 'Payments', count: '' },
    { href: `/${locale}/admin/fleet`, icon: '🏎️', label: 'Fleet Management', count: '' },
    { href: `/${locale}/admin/seo`, icon: '🔍', label: 'SEO Settings', count: '' },
    { href: `/${locale}/admin/languages`, icon: '🌐', label: 'Languages', count: '5' },
    { href: `/${locale}/admin/content`, icon: '📝', label: 'Content Management', count: '' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className={`text-xs font-medium mt-1 ${s.color}`}>{s.change}</div>
              </div>
            ))}
          </div>

          {/* Revenue chart placeholder */}
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-8">
            <h2 className="font-semibold mb-4">Revenue Overview</h2>
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
              Revenue chart will render here
            </div>
          </div>

          {/* Management sections */}
          <h2 className="text-lg font-semibold mb-4">Management</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {sections.map((s) => (
              <Link key={s.href} href={s.href}
                className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-yellow-400 transition-colors text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-medium text-sm">{s.label}</div>
                {s.count && <div className="text-xs text-gray-500 mt-0.5">{s.count}</div>}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
