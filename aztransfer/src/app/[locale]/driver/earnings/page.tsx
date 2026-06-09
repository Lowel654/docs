'use client';
import Header from '@/components/layout/Header';

export default function DriverEarningsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Earnings Dashboard</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold text-green-500">0 AZN</div>
              <div className="text-sm text-gray-500 mt-1">This Week</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-3xl font-bold text-green-500">0 AZN</div>
              <div className="text-sm text-gray-500 mt-1">This Month</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center text-gray-500">
            Earnings history will appear here.
          </div>
        </div>
      </main>
    </>
  );
}
