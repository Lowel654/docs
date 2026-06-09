'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

const faqs = [
  { q: 'How do I book an airport transfer?', a: 'You can book directly on our website, via WhatsApp at +994 55 853 50 55, or by calling us. Enter your pickup and dropoff locations, select a vehicle, and confirm your booking.' },
  { q: 'What happens if my flight is delayed?', a: 'We track your flight in real-time. If your flight is delayed, your driver will adjust their arrival time accordingly at no extra cost.' },
  { q: 'What types of vehicles do you offer?', a: 'We offer Economy, Comfort, Business (Mercedes E-Class, S-Class), SUV, Minivan (Mercedes V-Class), Minibus (Mercedes Sprinter), and full-size buses.' },
  { q: 'Can I cancel my booking?', a: 'Yes, you can cancel up to 2 hours before the scheduled pickup time for a full refund.' },
  { q: 'Do you offer corporate accounts?', a: 'Yes! We provide tailored corporate transportation solutions with monthly invoicing, dedicated account managers, and priority service.' },
  { q: 'Is there a meet and greet service?', a: 'Yes, our drivers will meet you at the arrivals area holding a sign with your name. This is included in all airport transfer bookings.' },
  { q: 'What payment methods do you accept?', a: 'We accept cash, credit/debit cards, and bank transfers. Corporate clients can also pay via monthly invoices.' },
  { q: 'Do you operate 24/7?', a: 'Yes, we operate around the clock, 7 days a week, 365 days a year.' },
];

export default function FAQPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl font-bold">{t('faq.title')}</h1>
        </section>
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-3xl mx-auto space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-medium flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  {faq.q}
                  <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 text-sm">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
