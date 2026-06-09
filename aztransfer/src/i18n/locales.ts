import { Locale } from '@/types';

export const locales: Locale[] = ['az', 'en', 'ru', 'tr', 'ar'];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  az: 'Azərbaycanca',
  en: 'English',
  ru: 'Русский',
  tr: 'Türkçe',
  ar: 'العربية',
};

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  az: 'ltr',
  en: 'ltr',
  ru: 'ltr',
  tr: 'ltr',
  ar: 'rtl',
};
