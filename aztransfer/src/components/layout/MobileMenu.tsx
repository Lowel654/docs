'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  const { t, locale } = useTranslation();

  const links = [
    { href: `/${locale}`, label: t('nav.home') },
    { href: `/${locale}/airport`, label: t('nav.airport') },
    { href: `/${locale}/fleet`, label: t('nav.fleet') },
    { href: `/${locale}/corporate`, label: t('nav.corporate') },
    { href: `/${locale}/bus-services`, label: t('nav.bus') },
    { href: `/${locale}/about`, label: t('nav.about') },
    { href: `/${locale}/contact`, label: t('nav.contact') },
    { href: `/${locale}/blog`, label: t('nav.blog') },
    { href: `/${locale}/faq`, label: t('nav.faq') },
    { href: `/${locale}/privacy`, label: t('nav.privacy') },
    { href: `/${locale}/terms`, label: t('nav.terms') },
    { divider: true },
    { href: `/${locale}/login`, label: t('nav.login') },
    { href: `/${locale}/register`, label: t('nav.register') },
    { href: `/${locale}/account`, label: t('nav.account') },
    { href: `/${locale}/account/bookings`, label: t('nav.bookings') },
    { href: `/${locale}/account/addresses`, label: t('nav.favorites') },
    { href: `/${locale}/account/payments`, label: t('nav.payments') },
  ] as const;

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white dark:bg-gray-900 z-[70] shadow-xl',
          'transform transition-transform duration-300 ease-out',
          'overflow-y-auto',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <span className="font-bold text-lg">
            <span className="text-yellow-500">AZ</span>TRANSFER<span className="text-yellow-500">.AZ</span>
          </span>
          <button onClick={onClose} className="p-2 -mr-2" aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="py-2">
          {links.map((link, i) => {
            if ('divider' in link) {
              return <hr key={i} className="my-2 border-gray-200 dark:border-gray-800" />;
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block px-6 py-3 text-[15px] font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:bg-gray-200"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
