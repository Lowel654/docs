'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function BusServicesPage() {
  const { t } = useTranslation();
  const routes = [
    { from: 'Baku', to: 'Gabala', price: 'from 150 AZN', duration: '4h' },
    { from: 'Baku', to: 'Sheki', price: 'from 200 AZN', duration: '5h' },
    { from: 'Baku', to: 'Ganja', price: 'from 180 AZN', duration: '5h' },
    { from: 'Baku', to: 'Lankaran', price: 'from 160 AZN', duration: '4h' },
    { from: 'Baku', to: 'Shahdag', price: 'from 200 AZN', duration: '3.5h' },
    { from: 'Baku', to: 'Quba', price: 'from 120 AZN', duration: '3h' },
  ];
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('bus.title')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('bus.desc')}</p>
        </section>
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Routes</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {routes.map((r) => (
                <div key={`${r.from}-${r.to}`} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{r.from} → {r.to}</div>
                    <div className="text-sm text-gray-500">~{r.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-600">{r.price}</div>
                    <div className="text-xs text-gray-500">per vehicle</div>
                  </div>
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
