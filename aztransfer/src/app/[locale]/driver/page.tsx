'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function DriverPanel() {
  const { locale } = useTranslation();
  const [isOnline, setIsOnline] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Driver status */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold">Driver Panel</h1>
                <p className="text-sm text-gray-500">Welcome, Driver</p>
              </div>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  isOnline ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </button>
            </div>

            {isOnline && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-center">
                <p className="text-sm font-medium">Waiting for trip requests...</p>
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-yellow-500">0</div>
              <div className="text-xs text-gray-500">Today&apos;s Trips</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-green-500">0 AZN</div>
              <div className="text-xs text-gray-500">Today&apos;s Earnings</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold">5.0</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-2">
            {[
              { href: `/${locale}/driver/trips`, icon: '🗺️', label: 'Trip History' },
              { href: `/${locale}/driver/earnings`, icon: '💰', label: 'Earnings Dashboard' },
              { href: `/${locale}/driver/documents`, icon: '📄', label: 'Documents' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 hover:border-yellow-400 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium flex-1">{item.label}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
