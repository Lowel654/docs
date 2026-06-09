'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';

const mockTrips = [
  { id: 'T-001', customer: 'John D.', from: 'Airport', to: 'Flame Towers', status: 'pending', driver: null },
  { id: 'T-002', customer: 'Sarah M.', from: 'Old City', to: 'Port Baku', status: 'active', driver: 'Driver A' },
  { id: 'T-003', customer: 'Ali K.', from: 'Hilton', to: 'Airport', status: 'pending', driver: null },
];

export default function DispatchPanel() {
  const [tab, setTab] = useState<'active' | 'pending' | 'drivers'>('pending');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Dispatch Panel</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['pending', 'active', 'drivers'] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === t ? 'bg-black dark:bg-yellow-400 text-white dark:text-black' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}>
                {t === 'pending' ? 'Pending Trips' : t === 'active' ? 'Active Trips' : 'Drivers'}
              </button>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-[300px] mb-6 flex items-center justify-center text-gray-500">
            Live Driver Map (Google Maps integration)
          </div>

          {/* Trip list */}
          <div className="space-y-3">
            {mockTrips.filter((t) => tab === 'pending' ? t.status === 'pending' : tab === 'active' ? t.status === 'active' : true).map((trip) => (
              <div key={trip.id} className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-gray-400">{trip.id}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    trip.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>{trip.status}</span>
                </div>
                <div className="text-sm font-medium mb-1">{trip.customer}</div>
                <div className="text-sm text-gray-500">{trip.from} → {trip.to}</div>
                <div className="flex gap-2 mt-3">
                  {!trip.driver && (
                    <button className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1.5 rounded-lg">Assign Driver</button>
                  )}
                  <button className="bg-gray-100 dark:bg-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
