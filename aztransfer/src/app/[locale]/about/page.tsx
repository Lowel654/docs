'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('about.desc')}</p>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <h2>Who We Are</h2>
            <p>AZTRANSFER.AZ is Azerbaijan&apos;s premier airport transfer and chauffeur service. Operating 24/7, we provide reliable, comfortable, and luxurious transportation across Baku and all of Azerbaijan.</p>

            <h2>Our Services</h2>
            <ul>
              <li><strong>Airport Transfers</strong> — Professional meet &amp; greet service at Heydar Aliyev International Airport with flight tracking and delay handling.</li>
              <li><strong>Chauffeur Service</strong> — Executive chauffeur-driven vehicles for business and leisure.</li>
              <li><strong>Corporate Transportation</strong> — Tailored solutions for businesses, events, and conferences.</li>
              <li><strong>Intercity Transfers</strong> — Comfortable travel between cities across Azerbaijan.</li>
              <li><strong>Minibus &amp; Bus Rental</strong> — Group transportation for tours, events, and corporate needs.</li>
            </ul>

            <h2>Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose mt-6">
              {[
                { num: '50+', label: 'Premium Vehicles' },
                { num: '100+', label: 'Professional Drivers' },
                { num: '24/7', label: 'Customer Support' },
                { num: '10K+', label: 'Happy Customers' },
                { num: '99%', label: 'On-Time Rate' },
                { num: '5★', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">{s.num}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
