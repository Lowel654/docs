'use client';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';

export default function PaymentsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{t('nav.payments')}</h1>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="font-semibold mb-1">No payment methods saved</h3>
            <p className="text-sm text-gray-500 mb-4">Add a card to speed up your bookings.</p>
            <button className="bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold px-6 py-2.5 rounded-xl text-sm">
              Add Payment Method
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
