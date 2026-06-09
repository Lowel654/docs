'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export default function AccountPage() {
  const { t, locale } = useTranslation();

  const sections = [
    { href: `/${locale}/account/bookings`, icon: '📋', label: t('nav.bookings'), desc: 'View upcoming and past trips' },
    { href: `/${locale}/account/addresses`, icon: '📍', label: t('nav.favorites'), desc: 'Manage saved locations' },
    { href: `/${locale}/account/payments`, icon: '💳', label: t('nav.payments'), desc: 'Payment methods & invoices' },
    { href: `/${locale}/account/invoices`, icon: '🧾', label: 'Invoices', desc: 'Download trip invoices' },
    { href: `/${locale}/account/notifications`, icon: '🔔', label: 'Notifications', desc: 'Notification preferences' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Profile card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-2xl font-bold text-yellow-600">
                G
              </div>
              <div>
                <h1 className="text-xl font-bold">Guest User</h1>
                <p className="text-sm text-gray-500">guest@aztransfer.az</p>
              </div>
            </div>
          </div>

          {/* Menu sections */}
          <div className="space-y-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-yellow-400 transition-colors"
              >
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{s.label}</div>
                  <div className="text-sm text-gray-500">{s.desc}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          <button className="w-full mt-8 text-red-500 font-medium py-3 border border-red-200 dark:border-red-900 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            {t('auth.logout')}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
