import { MetadataRoute } from 'next';

const BASE_URL = 'https://aztransfer.az';
const locales = ['az', 'en', 'ru', 'tr', 'ar'];

const pages = [
  '', '/airport', '/fleet', '/corporate', '/bus-services',
  '/about', '/contact', '/blog', '/faq', '/privacy', '/terms',
  '/login', '/register',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page === '/airport' ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
