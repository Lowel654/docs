'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { SITE } from '@/config/site';
import { phoneLink, whatsappLink } from '@/lib/utils';

export default function Footer() {
  const { t, locale } = useTranslation();

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-bold text-xl text-white mb-2">
              <span className="text-yellow-400">AZ</span>TRANSFER<span className="text-yellow-400">.AZ</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{t('footer.tagline')}</p>
            <div className="space-y-1.5 text-sm">
              <a href={phoneLink(SITE.phone)} className="block hover:text-yellow-400 transition-colors">
                {SITE.phone}
              </a>
              <a href={phoneLink(SITE.phoneAlt)} className="block hover:text-yellow-400 transition-colors">
                {SITE.phoneAlt}
              </a>
              <a href={`mailto:${SITE.email}`} className="block hover:text-yellow-400 transition-colors">
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/airport`} className="hover:text-yellow-400 transition-colors">{t('nav.airport')}</Link></li>
              <li><Link href={`/${locale}/corporate`} className="hover:text-yellow-400 transition-colors">{t('nav.corporate')}</Link></li>
              <li><Link href={`/${locale}/bus-services`} className="hover:text-yellow-400 transition-colors">{t('nav.bus')}</Link></li>
              <li><Link href={`/${locale}/fleet`} className="hover:text-yellow-400 transition-colors">{t('nav.fleet')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/about`} className="hover:text-yellow-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-yellow-400 transition-colors">{t('nav.blog')}</Link></li>
              <li><Link href={`/${locale}/faq`} className="hover:text-yellow-400 transition-colors">{t('nav.faq')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-yellow-400 transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Legal & support */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/privacy`} className="hover:text-yellow-400 transition-colors">{t('nav.privacy')}</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-yellow-400 transition-colors">{t('nav.terms')}</Link></li>
            </ul>
            <a
              href={whatsappLink(SITE.whatsapp, 'Hello! I need a transfer.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          {SITE.copyright}
        </div>
      </div>
    </footer>
  );
}
