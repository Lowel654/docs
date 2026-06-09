'use client';
import Header from '@/components/layout/Header';

export default function DriverTripsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Trip History</h1>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 text-center text-gray-500">
            No trips yet. Accept your first trip to get started.
          </div>
        </div>
      </main>
    </>
  );
}
