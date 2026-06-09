'use client';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/hooks/useTranslation';

export default function AddressesPage() {
  const { t } = useTranslation();
  const saved = [
    { label: 'Home', address: '28 May Street, Baku' },
    { label: 'Work', address: 'Port Baku Towers, Baku' },
    { label: 'Airport', address: 'Heydar Aliyev International Airport' },
  ];
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{t('nav.favorites')}</h1>
          <div className="space-y-3">
            {saved.map((s) => (
              <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.label}</div>
                  <div className="text-sm text-gray-500">{s.address}</div>
                </div>
                <button className="text-red-500 text-sm hover:underline">{t('common.delete')}</button>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl py-4 text-gray-500 hover:border-yellow-400 hover:text-yellow-600 transition-colors">
            + Add New Address
          </button>
        </div>
      </main>
    </>
  );
}
