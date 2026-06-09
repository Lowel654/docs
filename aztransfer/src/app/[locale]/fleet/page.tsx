'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

const fleetItems = [
  {
    slug: 'mercedes-e-class',
    name: 'Mercedes E-Class',
    category: 'Business',
    passengers: 3,
    luggage: 2,
    features: ['Leather seats', 'Climate control', 'Wi-Fi', 'USB charging', 'Premium sound'],
    desc: 'The Mercedes E-Class offers supreme comfort and elegance. Perfect for business meetings and airport transfers.',
  },
  {
    slug: 'mercedes-s-class',
    name: 'Mercedes S-Class',
    category: 'VIP',
    passengers: 3,
    luggage: 2,
    features: ['Massage seats', 'Ambient lighting', 'Wi-Fi', 'Mini bar', 'Privacy partition'],
    desc: 'The pinnacle of luxury travel. The S-Class provides an unmatched first-class experience.',
  },
  {
    slug: 'mercedes-v-class',
    name: 'Mercedes V-Class',
    category: 'Minivan',
    passengers: 7,
    luggage: 5,
    features: ['Captain seats', 'Conference layout', 'Wi-Fi', 'USB ports', 'Ample luggage space'],
    desc: 'Ideal for families and groups. Spacious interior with premium comfort for up to 7 passengers.',
  },
  {
    slug: 'toyota-camry',
    name: 'Toyota Camry',
    category: 'Comfort',
    passengers: 4,
    luggage: 2,
    features: ['Comfortable seats', 'Climate control', 'USB charging', 'Spacious trunk'],
    desc: 'A reliable and comfortable choice for everyday transfers and airport rides.',
  },
  {
    slug: 'mercedes-sprinter',
    name: 'Mercedes Sprinter',
    category: 'Minibus',
    passengers: 16,
    luggage: 10,
    features: ['Reclining seats', 'Air conditioning', 'USB ports', 'Luggage compartment', 'PA system'],
    desc: 'Perfect for group transfers, corporate events, and tours. Seats up to 16 passengers in comfort.',
  },
  {
    slug: 'minibus-fleet',
    name: 'Minibus Fleet',
    category: 'Minibus',
    passengers: 20,
    luggage: 15,
    features: ['Air conditioning', 'Comfortable seats', 'Large luggage area', 'PA system'],
    desc: 'Various minibuses for group transportation needs. Ideal for corporate events and tours.',
  },
  {
    slug: 'bus-fleet',
    name: 'Bus Fleet',
    category: 'Bus',
    passengers: 50,
    luggage: 50,
    features: ['Air conditioning', 'Reclining seats', 'Restroom', 'Entertainment system', 'Wi-Fi'],
    desc: 'Full-size buses for large groups, conferences, and intercity travel across Azerbaijan.',
  },
];

export default function FleetPage() {
  const { t, locale } = useTranslation();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('fleet.title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('fleet.desc')}</p>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto grid gap-8">
            {fleetItems.map((item) => (
              <div
                key={item.slug}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden flex flex-col md:flex-row"
              >
                {/* Image placeholder */}
                <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <svg className="w-24 h-16 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                  </svg>
                </div>

                {/* Content */}
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <span className="bg-yellow-400 text-black text-xs font-semibold px-2.5 py-1 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.desc}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <span>👤 Up to {item.passengers} passengers</span>
                    <span>🧳 Up to {item.luggage} luggage</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.features.map((f) => (
                      <span key={f} className="bg-gray-200 dark:bg-gray-800 text-xs px-3 py-1.5 rounded-full">{f}</span>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}`}
                    className="inline-block bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity"
                  >
                    {t('nav.bookNow')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
