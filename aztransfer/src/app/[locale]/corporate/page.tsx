'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

export default function CorporatePage() {
  const { t, locale } = useTranslation();
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('corporate.title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('corporate.desc')}</p>
        </section>
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { title: 'Executive Transfers', desc: 'Premium chauffeur service for executives and VIPs with Mercedes S-Class and E-Class vehicles.' },
              { title: 'Event Transportation', desc: 'Coordinated transportation for conferences, exhibitions, and corporate events.' },
              { title: 'Employee Shuttles', desc: 'Daily shuttle services for your workforce with flexible scheduling.' },
              { title: 'Airport Transfers', desc: 'Reliable airport pickups for business travelers with flight tracking and meet & greet.' },
            ].map((s) => (
              <div key={s.title} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={`/${locale}/contact`} className="bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold px-8 py-3.5 rounded-xl">
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
