import { Locale } from '@/types';
import { locales, defaultLocale } from '@/i18n/locales';

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale;

  const lang = navigator.language?.toLowerCase() || '';

  if (lang.startsWith('az')) return 'az';
  if (lang.startsWith('ru')) return 'ru';
  if (lang.startsWith('tr')) return 'tr';
  if (lang.startsWith('ar')) return 'ar';

  return defaultLocale;
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}

export function whatsappLink(phone: string, message?: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  const base = `https://wa.me/${clean}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function phoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`;
}
