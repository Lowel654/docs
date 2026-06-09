'use client';

import { useParams } from 'next/navigation';
import { t } from '@/i18n/translations';
import { Locale } from '@/types';
import { defaultLocale } from '@/i18n/locales';

export function useTranslation() {
  const params = useParams();
  const locale = (params?.locale as Locale) || defaultLocale;

  return {
    t: (key: string) => t(locale, key),
    locale,
  };
}
