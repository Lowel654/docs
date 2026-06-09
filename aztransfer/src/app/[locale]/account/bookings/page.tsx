'use client';

import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';

const mockBookings = [
  { id: 'BK-001', from: 'Heydar Aliyev Airport', to: 'Flame Towers', date: '2025-06-15', status: 'completed', price: '25.00 AZN', vehicle: 'Comfort' },
  { id: 'BK-002', from: 'Flame Towers', to: 'Old City', date: '2025-06-18', status: 'upcoming', price: '12.00 AZN', vehicle: 'Economy' },
  { id: 'BK-003', from: 'Boulevard Hotel', to: 'Heydar Aliyev Airport', date: '2025-06-20', status: 'upcoming', price: '28.00 AZN', vehicle: 'Business' },
];

export default function BookingsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">{t('nav.bookings')}</h1>
          <div className="space-y-3">
            {mockBookings.map((b) => (
              <div key={b.id} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gray-400">{b.id}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    b.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {b.status}
                  </span>
                </div>
                <div className="text-sm mb-1">
                  <span className="text-green-500">●</span> {b.from}
                </div>
                <div className="text-sm mb-2">
                  <span className="text-gray-900 dark:text-white">■</span> {b.to}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{b.date} · {b.vehicle}</span>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{b.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
