'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { SITE } from '@/config/site';
import Link from 'next/link';

export default function AirportPage() {
  const { t, locale } = useTranslation();
  const [flightNumber, setFlightNumber] = useState('');

  const features = [
    { icon: '✈️', title: t('airport.trackFlight'), desc: 'Real-time flight tracking with automatic delay handling.' },
    { icon: '🤝', title: t('airport.meetGreet'), desc: 'Professional driver waiting at arrivals with your name sign.' },
    { icon: '📡', title: t('airport.arrival'), desc: 'We monitor your flight and adjust pickup time automatically.' },
    { icon: '🕐', title: '24/7 Service', desc: 'Available around the clock for all flights.' },
  ];

  const vehicles = [
    { name: 'Economy Sedan', price: 'from 20 AZN', passengers: 3, luggage: 2 },
    { name: 'Comfort Sedan', price: 'from 30 AZN', passengers: 3, luggage: 2 },
    { name: 'Business Class', price: 'from 50 AZN', passengers: 3, luggage: 2 },
    { name: 'Minivan', price: 'from 45 AZN', passengers: 7, luggage: 5 },
    { name: 'Sprinter', price: 'from 80 AZN', passengers: 16, luggage: 10 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('airport.title')}</h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t('airport.desc')}</p>

            {/* Flight tracker */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-300 mb-2 text-left">
                {t('airport.flightNumber')}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. TK340"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
                  {t('airport.trackFlight')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing table */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Airport Transfer Prices</h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Vehicle</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold">Passengers</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold">Luggage</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium">{v.name}</td>
                      <td className="text-center px-4 py-4 text-gray-600 dark:text-gray-400">{v.passengers}</td>
                      <td className="text-center px-4 py-4 text-gray-600 dark:text-gray-400">{v.luggage}</td>
                      <td className="text-right px-6 py-4 font-semibold text-yellow-600">{v.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center bg-white dark:bg-gray-950">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Airport Transfer?</h2>
          <p className="text-gray-500 mb-8">Professional, reliable service from Heydar Aliyev International Airport.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}`}
              className="bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              {t('nav.bookNow')}
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=Hello! I need an airport transfer.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-600 transition-colors"
            >
              Book via WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
