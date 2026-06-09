'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import { SITE } from '@/config/site';
import { phoneLink, whatsappLink } from '@/lib/utils';

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production this would POST to the PHP API
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-gray-300">{t('contact.desc')}</p>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href={phoneLink(SITE.phone)} className="block text-yellow-600 hover:underline text-lg font-medium">{SITE.phone}</a>
                    <a href={phoneLink(SITE.phoneAlt)} className="block text-gray-500 hover:text-yellow-600">{SITE.phoneAlt}</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href={`mailto:${SITE.email}`} className="text-yellow-600 hover:underline">{SITE.email}</a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a href={whatsappLink(SITE.whatsapp)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">{SITE.whatsappDisplay}</a>
                  </div>
                </div>

                {/* 24/7 Support */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-1">{t('footer.support')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We are available 24 hours a day, 7 days a week to assist with your transfer needs.</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">📨</div>
                  <h3 className="font-bold text-lg mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">We&apos;ll get back to you within 1 hour.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('contact.form.message')}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-700 bg-transparent rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black dark:bg-yellow-400 dark:text-black text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    {t('contact.form.send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Google Maps embed placeholder */}
        <section className="h-[400px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-gray-500">Google Maps location will appear here</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
