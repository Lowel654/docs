'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';

export default function LoginPage() {
  const { t, locale } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // POST to /api/auth/login
    alert('Login functionality will connect to PHP backend API');
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
            <p className="text-gray-500">{t('auth.login')}</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1.5">{t('auth.email')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1.5">{t('auth.password')}</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Link href="#" className="text-sm text-yellow-600 hover:underline mt-2 inline-block">
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <button type="submit" className="w-full bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
              {t('auth.signIn')}
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              {t('auth.noAccount')}{' '}
              <Link href={`/${locale}/register`} className="text-yellow-600 hover:underline font-medium">{t('auth.signUp')}</Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
