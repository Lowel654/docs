'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';

export default function RegisterPage() {
  const { t, locale } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Registration will connect to PHP backend API');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-950">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold mb-2">
              <span className="text-yellow-500">AZ</span>TRANSFER<span className="text-yellow-500">.AZ</span>
            </div>
            <p className="text-gray-500">{t('auth.register')}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">{t('auth.name')}</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">{t('auth.email')}</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">{t('auth.phone')}</label>
              <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">{t('auth.password')}</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <button type="submit" className="w-full bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
              {t('auth.signUp')}
            </button>
            <p className="text-center text-sm text-gray-500">
              {t('auth.hasAccount')}{' '}
              <Link href={`/${locale}/login`} className="text-yellow-600 hover:underline font-medium">{t('auth.signIn')}</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
