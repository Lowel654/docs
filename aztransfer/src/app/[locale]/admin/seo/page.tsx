'use client';
import Header from '@/components/layout/Header';

export default function AdminSeoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Seo Management</h1>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <input type="text" placeholder="Search..." className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-transparent" />
              <button className="bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded-lg">Add New</button>
            </div>
            <div className="text-center text-gray-500 py-12">
              Data table will load from the API
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
