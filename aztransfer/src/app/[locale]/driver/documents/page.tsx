'use client';
import Header from '@/components/layout/Header';

export default function DriverDocumentsPage() {
  const docs = [
    { type: 'Driver License', status: 'pending', icon: '🪪' },
    { type: 'Vehicle Registration', status: 'pending', icon: '🚗' },
    { type: 'Insurance', status: 'pending', icon: '📋' },
    { type: 'ID Document', status: 'pending', icon: '🆔' },
  ];
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Documents</h1>
          <div className="space-y-3">
            {docs.map((d) => (
              <div key={d.type} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <div className="font-medium">{d.type}</div>
                    <div className="text-xs text-yellow-600">Upload required</div>
                  </div>
                </div>
                <button className="bg-yellow-400 text-black text-sm font-semibold px-4 py-2 rounded-lg">Upload</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
