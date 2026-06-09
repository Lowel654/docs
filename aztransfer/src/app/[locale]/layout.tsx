import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { localeDirection } from '@/i18n/locales';
import { Locale } from '@/types';
import { SITE, KEYWORDS } from '@/config/site';
import PWAInstall from '@/components/layout/PWAInstall';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const metaTitles: Record<string, string> = {
  az: 'AZTRANSFER.AZ — Bakı Hava Limanı Transfer və Şofer Xidməti',
  en: 'AZTRANSFER.AZ — Baku Airport Transfer & Chauffeur Service',
  ru: 'AZTRANSFER.AZ — Трансфер из аэропорта Баку и услуги шофёра',
  tr: 'AZTRANSFER.AZ — Bakü Havalimanı Transfer & Şoför Hizmeti',
  ar: 'AZTRANSFER.AZ — نقل مطار باكو وخدمة السائق',
};

const metaDescs: Record<string, string> = {
  az: 'Bakı hava limanı transfer, VIP transfer, korporativ nəqliyyat, minivan və avtobus icarəsi. 24/7 xidmət.',
  en: 'Professional airport transfer, VIP chauffeur, corporate transportation, minivan & bus rental in Baku, Azerbaijan. 24/7 service.',
  ru: 'Профессиональный трансфер из аэропорта, VIP шофёр, корпоративный транспорт, аренда минивэнов и автобусов в Баку. Круглосуточно.',
  tr: 'Profesyonel havalimanı transferi, VIP şoför, kurumsal ulaşım, Bakü\'de minivan ve otobüs kiralama. 7/24 hizmet.',
  ar: 'نقل احترافي من المطار، سائق VIP، نقل الشركات، تأجير حافلات صغيرة وحافلات في باكو. خدمة على مدار الساعة.',
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as Locale;
  return {
    title: {
      default: metaTitles[locale] || metaTitles.en,
      template: `%s | ${SITE.name}`,
    },
    description: metaDescs[locale] || metaDescs.en,
    keywords: KEYWORDS[locale] || KEYWORDS.en,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages: {
        az: `${SITE.url}/az`,
        en: `${SITE.url}/en`,
        ru: `${SITE.url}/ru`,
        tr: `${SITE.url}/tr`,
        ar: `${SITE.url}/ar`,
      },
    },
    openGraph: {
      title: metaTitles[locale] || metaTitles.en,
      description: metaDescs[locale] || metaDescs.en,
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      locale: locale === 'az' ? 'az_AZ' : locale === 'ru' ? 'ru_RU' : locale === 'tr' ? 'tr_TR' : locale === 'ar' ? 'ar_AE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitles[locale] || metaTitles.en,
      description: metaDescs[locale] || metaDescs.en,
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return [{ locale: 'az' }, { locale: 'en' }, { locale: 'ru' }, { locale: 'tr' }, { locale: 'ar' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dir = localeDirection[params.locale as Locale] || 'ltr';

  return (
    <html lang={params.locale} dir={dir} className="dark">
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE.name} />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TransportationService',
              name: SITE.name,
              url: SITE.url,
              telephone: SITE.phone,
              email: SITE.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: SITE.city,
                addressCountry: 'AZ',
              },
              description: metaDescs[params.locale] || metaDescs.en,
              priceRange: '$$',
              areaServed: { '@type': 'Country', name: 'Azerbaijan' },
              serviceType: ['Airport Transfer', 'Chauffeur Service', 'Corporate Transportation'],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased`}>
        <PWAInstall />
        {children}
      </body>
    </html>
  );
}
